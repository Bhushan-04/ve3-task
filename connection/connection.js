const { Sequelize, DataTypes } = require("sequelize");

const {dbname, dbuser, dbpassword} = process.env;

try {
    var sequelize = new Sequelize(dbname, dbuser, dbpassword, {
        host: "localhost",
        dialect: "mysql",
        logging: false
    })
    if(sequelize.authenticate()){
        console.log('db connected');
    }
} catch (error) {
    console.log(error);
}


const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.task = require("../models/Task.model")(
    sequelize,
    DataTypes
);

db.user = require("../models/User.model")(
    sequelize,
    DataTypes
);

db.user.hasMany(db.task, { foreignKey: 'userId', onDelete: 'CASCADE' });
db.task.belongsTo(db.user, { foreignKey: 'userId' });


module.exports = db;