const errors = require('../lib/errors');
const production = process.env.NODE_ENV === 'production';

module.exports = function (err, req, res, next) {
    let tmpError = err;

    if (!(err instanceof errors.BaseError)) {
        tmpError = new errors.BaseError({
            message: err.message,
        });
        tmpError.stack = err.stack;
    }

    const result = {
        code: 500,
        status: 'error',
        data: {
            error: tmpError.name,
            message: ('Some failure happened on the server.'),
        }
    };

    if (!production) {
        result.data.info = tmpError.data;
        result.data.stack = tmpError.stack;
    }

    switch (tmpError.name) {
        case 'NotFoundError':
            {
                result.code = 404;
                break;
            }
        case 'UnauthorizedError':
            {
                result.code = 401;
                break;
            }
        case 'ForbiddenError':
            {
                result.code = 403;
                break;
            }
        case 'WrongParametersError':
            {
                result.data.message = tmpError.message || 'Не верный набор параметров.';
                result.code = 400;
            }
    }

    res.status(result.code).json(result);
};