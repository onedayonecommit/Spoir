const { User } = require("../models")
const { Checkaccesstoken } = require("./Jwtcheck")

module.exports.Regist_wallet_address = async (accesstoken, user_wallet_address, res) => {
    const user_email = Checkaccesstoken(accesstoken);
    if (user_email !== false) {
        try {
            await User.update({ user_wallet_address }, { where: { user_email } })
            res.send({
                registstatus: true,
                user_wallet_address
            })
        } catch (error) {
            console.log(error)
            res.send({
                registstatus: false,
                user_wallet_address: ""
            })
        }
    }
}