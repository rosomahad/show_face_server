class SocketEvents {
    constructor() {
        this.users = [];
        this.connections = [];
    }

    init(io) {
        io.sockets.on('connection', (socket) => {
            this.connections.push(socket);

            socket.on('disconnect', (data) => {
                this.connections.splice(this.connections.indexOf(data), 1);
            });
        });
    }

    emmit(name, data) {
        this.connections.forEach((socket) => socket.emit(name, data));
    }
}

const socketEvents = {
    ORDERS_CREATE: 'ORDERS_CREATE',
    ORDERS_UPDATE: 'ORDERS_UPDATE',
};

module.exports = {
    socketManager: new SocketEvents(),
    socketEvents
};
