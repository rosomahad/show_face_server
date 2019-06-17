module.exports = (sequelize, DataTypes) => {
    const Message = sequelize.define('Message',
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
        {
            timestamps: true,
        }
    );

    Message.associate = function (models) {
        Message.belongsTo(models.User, { as: 'creator', });

        Message.belongsTo(models.Channel, { as: 'channel', });
    };

    return Message;
};