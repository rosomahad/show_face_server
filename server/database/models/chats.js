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

        Chat.belongsTo(models.User, { as: 'firstMember', primaryKey: 'firstMemberId' });

        Chat.belongsTo(models.User, { as: 'secondMember', primaryKey: 'secondMemberId' });

    };

    return Chat;
};