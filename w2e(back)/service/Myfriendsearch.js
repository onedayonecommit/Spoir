const { Friend, User } = require("../models")
const { Checkaccesstoken } = require("./Jwtcheck");
const { MyfriendsSearch2 } = require("./Myfriendsearch2");

module.exports.MyfriendsSearch = async (user_email, res) => {
    var a = []
    // const user_email = await Checkaccesstoken(accesstoken);
    Friend.findAll({
        attributes: ["user_friend"]
    }, { where: { user_email } }).then(async (e) => {
        for (let i = 0; i < e.length; i++) {
            a.push([e[i].user_friend, await MyfriendsSearch2(i, e[i].user_friend)])
        }
        a.sort()
        res.send({
            hi: a
        })
    })
}