module.exports = (sequelize, DataTypes) => {
    const Channel = sequelize.define('Channel',
        {
            id: {
                type: DataTypes.BIGINT,
                primaryKey: true,
                autoIncrement: true,
                unique: true,
            },

            name: {
                type: DataTypes.STRING,
            },

            description: {
                type: DataTypes.STRING,
            },
        },
    );

    Channel.associate = function (models) {
        Channel.hasOne(models.User, { as: 'creator', foreignKey: 'creatorId' });
    };

    return Channel;
};