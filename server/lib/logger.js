const { createLogger, format, transports } = require('winston');
const path = require('path');
const fs = require('fs');

// https://github.com/winstonjs/winston#logging
// { error: 0, warn: 1, info: 2, verbose: 3, debug: 4, silly: 5 }
const level = process.env.LOG_LEVEL || 'debug';

const logDirectory = path.join(__dirname, '../logs');


const options = {
    file: {
        level: 'info',
        filename: `${logDirectory}/app.log`,
        handleExceptions: true,
        json: true,
        maxsize: 5242880, // 5MB
        maxFiles: 5,
        colorize: false,
    },
    console: {
        level: 'debug',
        handleExceptions: true,
        json: false,
        colorize: true,
    },
};

fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);

function formatParams(info) {
    const { timestamp, level, message, ...args } = info;
    const ts = timestamp.slice(0, 19).replace('T', ' ');

    return `${ts} ${level}: ${message} ${Object.keys(args).length
        ? JSON.stringify(args, '', '')
        : ''}`;
}

// https://github.com/winstonjs/winston/issues/1135
const developmentFormat = format.combine(
    format.colorize(),
    format.timestamp(),
    format.align(),
    format.printf(formatParams)
);

const productionFormat = format.combine(
    format.timestamp(),
    format.align(),
    format.printf(formatParams)
);

let logger;

if (process.env.NODE_ENV !== 'production') {
    logger = createLogger({
        level: level,
        format: developmentFormat,
        transports: [new transports.Console(options.console), new transports.File(options.file)]
    });

} else {
    logger = createLogger({
        level: level,
        format: productionFormat,
        transports: [
            new transports.File(options.file)
        ],
        exitOnError: false, // do not exit on handled exceptions
    });
}

logger.stream = {
    write: function (message, encoding) {
        logger.info(message);
    },
};

module.exports = logger; 