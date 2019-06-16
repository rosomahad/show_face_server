const tagsApi = require('./tags.api');
const authApi = require('./auth.api');
const usersApi = require('./users.api');
const chatsApi = require('./chats.api');
const videosApi = require('./videos.api');
const messagesApi = require('./messages.api');
const channelsApi = require('./channels.api');

module.exports = function (server) {
	server.use('/api/v1/auth', authApi);
	server.use('/api/v1/tags', tagsApi);
	server.use('/api/v1/chats', chatsApi);
	server.use('/api/v1/users', usersApi);
	server.use('/api/v1/videos', videosApi);
	server.use('/api/v1/messages', messagesApi);
	server.use('/api/v1/channels', channelsApi);
};