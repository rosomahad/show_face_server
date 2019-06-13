const express = require('express');
const path = require('path');
const cors = require('cors');
const helmet = require('helmet');
const passport = require('passport');
const bodyParser = require('body-parser');
const session = require('express-session');
const compression = require('compression');
const { socketManager } = require('./controllers/sockets.controller');
const http = require('http');
const sockets = require('socket.io');

const api = require('./api');
const logger = require('./lib/logger');

const {
	SESSION_SECRET = 'ssh!quiet,it\'asecret!',
	NODE_ENV
} = process.env;

const production = NODE_ENV === 'production';
const port = process.env.PORT || 8000;
const errorsMiddlwere = require('./middleware/errors.middleware');
const loggerMiddleware = require('./middleware/logger.middleware');

const SESSION_LIFETIME = 14 * 24 * 60 * 60 * 1000;

const whitelist = ['http://localhost:3000', 'http://localhost:8000'];

var corsOptions = {
	origin: function (origin, callback) {
		if (!production) return callback(null, true);
		if (whitelist.indexOf(origin) !== -1) {
			callback(null, true);
		} else {
			callback(new Error('Not allowed by CORS'));
		}
	},
	credentials: true
};

const sessionConfig = {
	name: 'sid',
	secret: SESSION_SECRET,
	resave: false,
	rolling: false,
	saveUninitialized: false,
	cookie: {
		httpOnly: true,
		secure: production,
		maxAge: SESSION_LIFETIME, // expires in 14 days
	},
};

const app = express();

const server = http.Server(app);

app.use(express.json());

const storageDir = path.join(__dirname, 'storage');

app.use('/storage', express.static(storageDir));

app.use(cors(corsOptions));

app.use(helmet());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
	extended: false,
}));

if (production) {
	app.use(compression());
	app.set('trust proxy', 1);
} // trust first proxy 

app.use(session(sessionConfig));

const io = sockets(server);

socketManager.init(io);

app.use(passport.initialize());

app.use(passport.session());

app.use(loggerMiddleware);

api(app);

app.use(express.static(path.resolve(__dirname, '../client/')));

app.get('/', (req, res) => {
	res.sendFile(path.resolve(__dirname, '../client/index.html'));
});

app.use(errorsMiddlwere);

server.listen(port, (err) => {
	if (err) throw err;
	logger.info('Listening on port ' + port);
});