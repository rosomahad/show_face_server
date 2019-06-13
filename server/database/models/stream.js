module.exports = (sequelize, DataTypes) => {
    const VideoStream = sequelize.define('VideoStream',
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
        },
    );

    VideoStream.associate = function (models) {
        VideoStream.hasOne(models.User, { as: 'creator', foreignKey: 'creatorId' });
    };

    return VideoStream;
};