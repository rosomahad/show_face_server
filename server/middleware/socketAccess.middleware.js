const isValid = () => true;

module.exports = (socket, next) => {
    // let token = socket.handshake.query.token;

    if (isValid()) {
        console.log('socket');
        return next();
    }

    return next(new Error('authentication error'));
};