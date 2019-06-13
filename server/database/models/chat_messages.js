module.exports = (sequelize, DataTypes) => {
    const ChatMessage = sequelize.define('ChatMessage',
        {
            id: {
                type: DataTypes.BIGINT,
                primaryKey: true,
                autoIncrement: true,
                unique: true,
            },

            message: {
                type: DataTypes.STRING,
            },
        },
    );

    ChatMessage.associate = function (models) {
        ChatMessage.hasOne(models.User, { as: 'user', foreignKey: 'userId' });
        // ChatMessage.hasOne(models.Chat);
    };

    return ChatMessage;
};