module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define(
        "User",
        {
            id: {
                type: DataTypes.BIGINT,
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
            },
            username: {
                type: DataTypes.STRING(255),
                allowNull: false,
            },
            email: {
                type: DataTypes.STRING(255),
                allowNull: false,
                unique: true, // Enforce unique emails
            },
            password: {
                type: DataTypes.STRING(255),
                allowNull: false,
            },
        },
        {
            timestamps: true, // Enable createdAt and updatedAt
        }
    );

    return User;
};
