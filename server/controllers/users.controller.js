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
};