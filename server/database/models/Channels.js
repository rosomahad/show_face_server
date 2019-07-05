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

            avatarUrl: {
                type: DataTypes.STRING,
            },
        },
    );

    Channel.associate = function (models) {
        Channel.belongsTo(models.User, { as: 'creator' });

        Channel.belongsToMany(models.Tag, { as: 'tags', through: 'ChannelTags' });
    };

    return Channel;
};