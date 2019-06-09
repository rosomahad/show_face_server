module.exports = (sequelize, DataTypes) => {
    const GameCategory = sequelize.define('GameCategory',
        {
            id: {
                type: DataTypes.BIGINT,
                primaryKey: true,
                autoIncrement: true,
                unique: true,
            },

        },
    );

    return GameCategory;
};