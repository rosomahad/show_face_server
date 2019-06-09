module.exports = (sequelize, DataTypes) => {
    const Video = sequelize.define('Video',
        {
            id: {
                type: DataTypes.BIGINT,
                primaryKey: true,
                autoIncrement: true,
                unique: true,
            },

            bannerUrl: {
                type: DataTypes.STRING,
            },

            isBanned: {
                type: DataTypes.BOOLEAN,
                defaultValue: false
            },

            isHidden: {
                type: DataTypes.BOOLEAN,
                defaultValue: false
            },
        },
    );

    Video.associate = function (models) {
        Video.hasMany(models.GameCategory, { as: 'categories', foreignKey: 'categoryId' });
        Video.hasMany(models.Tag, { as: 'tags', foreignKey: 'tagId' });
    };

    return Video;
};