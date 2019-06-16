const { Channel } = require('../database');

module.exports = {
    findByQuery: async (query) => {
        try {
            const result = await Channel.findAndCountAll();

            console.log(result);
            return result;
        } catch (error) {
            throw new Error(error);
        }
    },
    findById: async (id) => {
        try {
            const result = await Channel.findByPk(id);

            return result;
        } catch (error) {
            throw new Error(error);
        }
    },

    create: async (creatorId, values) => {
        try {
            const result = await Channel.create(values);

            result.addCreator(creatorId);

            return result;

        } catch (error) {
            throw new Error(error);
        }
    },

    updateById: async (id, values) => {
        try {
            const result = await Channel.update(values, {
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
            const result = await Channel.destroy({
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