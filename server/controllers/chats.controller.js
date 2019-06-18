const { Chat, User, Op } = require('../database');

const { WrongParametersError } = require('../lib/errors');

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

    findByMembersOrCreate: async (senderId, receiverId) => {

        try {
            if (+senderId === +receiverId) throw new WrongParametersError({ client_message: 'Can\'t create chat for the same users' });

            const query = {
                where: {
                    [Op.or]: [
                        {
                            firstMemberId: receiverId,
                        },
                        {
                            secondMemberId: receiverId,
                        }
                    ]
                },
                defaults: {
                    firstMemberId: senderId,
                    secondMemberId: receiverId,
                }
            };

            const [chat, created] = await Chat.findOrCreate(query);

            return chat || created;
        } catch (error) {
            throw new Error(error);
        }
    },

    findByUserId: async (userId) => {
        try {
            const query = {
                where: {
                    [Op.or]: [
                        {
                            firstMemberId: userId,
                        },
                        {
                            secondMemberId: userId,
                        }
                    ]
                },
                include: [
                    {
                        model: User,
                        as: 'firstMember'
                    },
                    {
                        model: User,
                        as: 'secondMember'
                    },
                ]
            };

            const result = await Chat.findAndCountAll(query);

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