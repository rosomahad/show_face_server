
const loggerFormat = process.env.NODE_ENV !== 'production' ? 'dev' : 'combined';

const morgan = require('morgan');
const winston = require('winston');

module.exports = morgan(loggerFormat, {
    skip: function (req, res) {
        return res.statusCode >= 400;
    },
    stream: winston.stream.write
});