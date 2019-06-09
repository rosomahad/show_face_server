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
        Chat.hasOne(models.Video);
        Chat.hasMany(models.ChatMessage, { as: 'messages', foreignKey: 'messageId' });
    };

    return Chat;
};