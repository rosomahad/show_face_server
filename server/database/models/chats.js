module.exports = (sequelize, DataTypes) => {
    const Chat = sequelize.define('Chat',
        {
            id: {
                type: DataTypes.BIGINT,
                primaryKey: true,
                autoIncrement: true,
                unique: true,
            },

            isActive: {
                type: DataTypes.BOOLEAN,
            },
        },
    );

    Chat.associate = function (models) {

        Chat.hasMany(models.Message, { as: 'messages' });

        Chat.hasMany(models.User, { as: 'members' });

    };

    return Chat;
};