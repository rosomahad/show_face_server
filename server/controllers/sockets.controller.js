const socketAccessMiddleware = require('../middleware/socketAccess.middleware');


class SocketEvents {
    constructor() {
        this.connections = [];
    }

    findUsersByChannelId(searchChannelId) { return (this.connections.filter(({ channelId }) => channelId === searchChannelId)); }

    getClientsData({ userId, channelId }) { return ({ userId, channelId }); }

    init(io) {
        io.sockets.on('connection', (socket) => {

            this.connections[socket.userId] = socket;

            socket
                .on('disconnect', (data) => {
                    this.connections
                        .splice(this.connections.indexOf(data), 1);
                })

                .on('channel_connect', ({ channelId }) => {
                    socket.channelId = channelId;
                })

                .on('channel_disconnect', ({ channelId, clientId }) => {
                    socket.channelId = undefined;

                    socket.emit('channel_disconnected', { channelId, clientId });
                })

                .on('channel_ice_candidate_connect', (iceCandidate) => {
                    const userId = socket.userId;

                    const connections =
                        this.findUsersByChannelId(socket.channelId)
                            .filter((usr) => usr.userId !== userId);
                    console.log('Sender id: ', socket.userId);
                    this.emit({
                        name: 'channel_ice_candidate_connected',
                        data: iceCandidate,
                        connections
                    });
                })

                .on('channel_client_sdp', ({ sdp }) => {
                    const connections = this.findUsersByChannelId(socket.channelId)
                        .filter((usr) => usr.userId !== socket.userId);
                    console.log('Sender id: ', socket.userId);
                    this.emit({
                        name: 'channel_client_sdp',
                        data: { sdp, userId: socket.userId, channelId: socket.channelId },
                        connections
                    });
                })

                .on('channel_client_candidate', ({ candidate }) => {
                    const connections = this.findUsersByChannelId(socket.channelId)
                        .filter((usr) => usr.userId !== socket.userId);
                    console.log('Sender id: ', socket.userId);
                    this.emit({
                        name: 'channel_client_candidate',
                        data: { candidate, userId: socket.userId, channelId: socket.channelId },
                        connections
                    });
                })

                .on('channel_client_answer', ({ sdp }) => {
                    const connections = this.findUsersByChannelId(socket.channelId)
                        .filter((usr) => usr.userId !== socket.userId);
                    console.log('Sender id: ', socket.userId);

                    this.emit({
                        name: 'channel_client_answer',
                        data: { sdp, userId: socket.userId, channelId: socket.channelId },
                        connections
                    });
                });

        });

        io.use(socketAccessMiddleware);
    }

    emit({ name, data, connections = this.connections }) {
        console.log('receiver ids: ', connections.map(({ userId }) => userId));

        connections.forEach((socket) => {
            socket.emit(name, data);
        });
    }
}

const socketEvents = {};

module.exports = {
    socketManager: new SocketEvents(),
    socketEvents
};
