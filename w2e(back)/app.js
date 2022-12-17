const express = require("express");
const { sequelize } = require("./models");
const post = require("./router/post");
const app = express();
const cors = require("cors");
const { Getseconds, Resetmacaddress } = require("./service/Resetmacaddress");
const dot = require("dotenv").config();
app.use(express.json());
app.use('/users', express.static('uploads'));
app.use(cors());
app.use(post)


setInterval(async () => {
    if (await Getseconds() % 86400 == 0) {
        console.log("utc 정각",)
        Resetmacaddress();
    }
}, 1000);

sequelize.sync({ force: false })
    .then(() => {
        console.log("db connected");
    })
    .catch((error) => {
        console.log(error);
    });

app.listen(8080, () => {
    console.log("8080 server on!")
})