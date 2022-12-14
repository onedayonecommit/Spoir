const { Friend } = require("../models")
const { Checkaccesstoken } = require("./Jwtcheck")

module.exports.MyfriendsSearch = async (user_email, res) => {
    // const user_email = await Checkaccesstoken(accesstoken);
    if (user_email !== false) {
        Friend.findAll({ attributes: ["user_friend"] }, { where: { user_email } }).then((e) => {
            var a = [];
            for (let i = 0; i < e.length; i++) {
                a.push(e[i].user_friend)
            }
            a.sort()
            res.send({ friendstatus: a })
        }).catch((error) => {
            console.log(error)
        })
    }
}