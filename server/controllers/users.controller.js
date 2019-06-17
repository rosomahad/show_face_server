const {
    User
} = require('../database');


module.exports = {
    findById: async (id) => {
        try {
            const result = await User.findByPk(id);

            return result;
        } catch (error) {
            throw new Error(error);
        }
    },

    create: async (values) => {
        try {
            const result = await User.addNewUser(values);

            return result;

        } catch (error) {
            throw new Error(error);
        }
    },

    updateById: async (id, values) => {
        try {
            const result = await User.update(values, {
                where: {
                    id
                }
            });

            return result;

        } catch (error) {
            throw new Error(error);
        }
    },

    deleteById: async (id) => {
        try {
            const result = await User.destroy({
                where: {
                    id
                }
            });

            return result;
        } catch (error) {
            throw new Error(error);
        }
    },

    addFriend: async (userId, friendId) => {
        try {

            const user = User.findByPk(userId);

            await user.addFriend(friendId);

        } catch (error) {
            throw new Error(error);
        }
    },

    findFriendsByQuery: async (userId, query = {}) => {
        try {

            const user = User.findByPk(userId);

            const result = {
                rows: await user.getFriends(),
                count: await user.countFriends(),
            };

            return result;

        } catch (error) {
            throw new Error(error);
        }
    },

    removeFriend: async (userId, friendId) => {
        try {

            const user = User.findByPk(userId);

            await user.removeFriend(friendId);

        } catch (error) {
            throw new Error(error);
        }
    },
};