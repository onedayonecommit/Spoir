const { User } = require("../models")
const { Checkaccesstoken } = require("./Jwtcheck")

module.exports.Addtoken = async (tokenamount, accesstoken, res) => {
    const user_email = await Checkaccesstoken(accesstoken);
    if (user_email !== false) {
        User.update({ user_utility_token: tokenamount }, { where: { user_email } })
        res.send({ addtokenstatus: true })
    }
    else {
        res.send({
            addtokenstatus: false,
        })
    }
}