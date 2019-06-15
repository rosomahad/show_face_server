const { Video } = require('../database');

module.exports = {
    findById: async (id) => {
        try {
            const result = await Video.findByPk(id);

            return result;
        } catch (error) {
            throw new Error(error);
        }
    },

    create: async (values) => {
        try {
            const result = await Video.create(values);

            return result;

        } catch (error) {
            throw new Error(error);
        }
    },

    updateById: async (id, values) => {
        try {
            const result = await Video.update(values, {
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
            const result = await Video.destroy({
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