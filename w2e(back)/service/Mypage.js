const { User } = require("../models")

module.exports.Mypageinfo = async (user_email, res) => {
    User.findOne({ where: { user_email } }).then((e) => {
        res.send({
            user_email: e.user_email,
            user_wallet_address: e.user_wallet_address,
            user_name: e.user_name
        })
    })
}