const { Chat } = require('../database');

module.exports = {
    findById: async (id) => {
        try {
            const result = await Chat.findByPk(id);

            return result;
        } catch (error) {
            throw new Error(error);
        }
    },

    create: async (values) => {
        try {
            const result = await Chat.create(values);

            return result;

        } catch (error) {
            throw new Error(error);
        }
    },

    updateById: async (id, values) => {
        try {
            const result = await Chat.update(values, {
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
            const result = await Chat.destroy({
                where: {
                    id
                }
            });

            return result;
        } catch (error) {
            throw new Error(error);
        }
    },
};