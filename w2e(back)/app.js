const express = require("express");
const { sequelize } = require("./models");
const post = require("./router/post");
const app = express();
const cors = require("cors");

app.use(express.json());
app.use(cors());
app.use(post)

sequelize.sync({ force: false })
    .then(() => {
        console.log("db connected");
    })
    .catch((error) => {
        console.log(error);
    });

app.listen(8080, () => {
    console.log("server on!")
})