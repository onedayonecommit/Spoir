const { where } = require("sequelize");
const { Friend } = require("../models");
const { Checkaccesstoken } = require("./Jwtcheck")

/** 친구 요청 함수 */
module.exports.Requestaddfriend = async (accesstoken, user_friend, res) => {
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

/** 친구 요청 수락 함수 */
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

/** 친구 요청 거절 함수 */
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