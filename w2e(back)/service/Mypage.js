const { User } = require("../models")
const { Checkaccesstoken } = require("./Jwtcheck")

module.exports.Mypageinfo = async (accesstoken, res) => {
    const user_email = await Checkaccesstoken(accesstoken)
    if (user_email !== false) {
        User.findOne({ where: { user_email } }).then((e) => {
            res.send({
                user_email: e.user_email,
                user_wallet_address: e.user_wallet_address,
                user_name: e.user_name
            })
        })
    }
}