const { User } = require("../models")

module.exports.Regist_wallet_address = async (user_email, user_wallet_address, res) => {
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