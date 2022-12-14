const { where } = require("sequelize");
const { Friend } = require("../models");
const { Checkaccesstoken } = require("./Jwtcheck")

module.exports.Addfriend = async (accesstoken, user_friend, res) => {
    const user_email = await Checkaccesstoken(accesstoken);
    if (user_email !== false) {
        Friend.create({ user_email, user_friend }).then((e) => {
            res.send({ addfriendstatus: "pending" })
        })
        // catch (error) {
        //     res.send({ addfriendstatus: "fail" })
        // }
    }
}

module.exports.Acceptaddfriend = async (accesstoken, user_email, res) => {
    const user_friend = await Checkaccesstoken(accesstoken);
    if (user_friend !== false) {
        Friend.update({ acceptedstatus: 1 }, { where: { user_friend, user_email } }).then((e) => {
            res.send({
                addfriendstatus: "accept"
            })
        })
    }
}

module.exports.Refuseaddfriend = async (accesstoken, user_email, res) => {
    const user_friend = await Checkaccesstoken(accesstoken);
    if (user_friend !== false) {
        Friend.destroy({ where: { user_friend, user_email } }).then((e) => {
            res.send({
                addfriendstatus: "refuse"
            })
        })
    }
}