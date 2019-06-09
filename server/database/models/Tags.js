module.exports = (sequelize, DataTypes) => {
    const Tag = sequelize.define('Tag',
        {
            id: {
                type: DataTypes.BIGINT,
                primaryKey: true,
                autoIncrement: true,
                unique: true,
            },

            name: {
                type: DataTypes.STRING,
            }
        },
    );

    return Tag;
};