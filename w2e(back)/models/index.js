const config = require("../config/config");
const Sequelize = require("sequelize");
const User = require("./user");
const Test = require("./test");

const sequelize = new Sequelize(
    config.dev.database,
    config.dev.username,
    config.dev.password,
    config.dev
);

const db = {};
db.sequelize = sequelize;
db.User = User
db.Test = Test

User.init(sequelize);
Test.init(sequelize);

module.exports = db;