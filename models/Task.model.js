module.exports = (sequelize, DataTypes) => {
    const Task = sequelize.define(
        "Task",
        {
            id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
            },
            title: {
                type: DataTypes.STRING(255),
                allowNull: false,
            },
            status: {
                type: DataTypes.INTEGER,
                allowNull: false,
                defaultValue: 1,
            },
            userId: {
                type: DataTypes.BIGINT, // Matches the type of the primary key in the User model
                allowNull: false,
                references: {
                    model: "Users", // Matches the table name of the User model
                    key: "id",
                },
                onDelete: "CASCADE", // Deletes tasks when the user is deleted
                onUpdate: "CASCADE", // Updates tasks when the user ID is updated
            },
        },
        {
            timestamps: true, // Enable createdAt and updatedAt
            paranoid: true,  // Enable soft deletes with deletedAt column
        }
    );

    return Task;
};
