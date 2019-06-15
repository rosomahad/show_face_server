const { verifyToken } = require('../lib/tokenAuth');

module.exports = (socket, next) => {

    const token = socket.handshake.query && socket.handshake.query.token;

    if (token) {

        verifyToken(socket.handshake.query.token, function (err, decoded) {
            if (err) return next(new Error('Authentication error'));

            socket.userId = decoded.userId;

            next();
        });

    } else {
        next(new Error('Authentication error'));
    }
};

