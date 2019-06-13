const socketAccessMiddleware = require('../middleware/socketAccess.middleware');

class SocketEvents {
    constructor() {
        this.users = [];
        this.connections = [];
    }

    init(io) {
        io.sockets.on('connection', (socket) => {
            this.connections.push(socket);
            this.users.push(socket);

            socket
                .on('disconnect', (data) => {
                    this.connections.splice(this.connections.indexOf(data), 1);
                })

                .on('set_user_id', (id) => {
                    socket.userId = id;
                })

                .on('is_user_online', (id) => {
                    socket.emit('user_status', !!this.connections.find(({ userId }) => userId === id));
                });
        });

        io.use(socketAccessMiddleware);
    }

    emit(name, data) {
        this.connections.forEach((socket) => socket.emit(name, data));
    }
}

const socketEvents = {};


module.exports = {
    socketManager: new SocketEvents(),
    socketEvents
};
