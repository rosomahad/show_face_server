module.exports = (sequelize, DataTypes) => {
    const Game = sequelize.define('Game',
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

            mainImage: {
                type: DataTypes.STRING,
            },
        },
    );


    Game.associate = function (models) {
        Game.hasMany(models.GameCategory, { as: 'categories', foreignKey: 'categoryId' });
    };

    return Game;
};