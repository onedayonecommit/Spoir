const dot = require("dotenv").config();

const config = {
    dev: {
        username: process.env.DB_ROOT_NAME,
        password: process.env.DB_PASSWORD,
        host: process.env.DB_HOST,
        database: process.env.DB_NAME,
        dialect: "mysql",
        timezone: "Asia/Seoul"
    },
};

module.exports = config;