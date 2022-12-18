const config = require("../config/config");
const Sequelize = require("sequelize");
const User = require("./user");
const Test = require("./test");
const Friend = require("./friends");
const Pendingfriend = require("./pendingfriend");
const Macaddress = require("./macaddress");

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
db.Friend = Friend;
db.Pendingfriend = Pendingfriend;
db.Macaddress = Macaddress;

User.init(sequelize);
Test.init(sequelize);
Friend.init(sequelize);
Pendingfriend.init(sequelize);
Macaddress.init(sequelize);

module.exports = db;
