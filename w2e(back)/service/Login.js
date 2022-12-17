const { User } = require("../models")
const { LoginAT, LoginRT } = require("./Createjwt")

module.exports.UserLogin = async (user_email, user_password, res) => {
    try {
        User.findOne({ where: { user_email, user_password } }).then((e) => {
            e == null ? res.send({ loginstatus: false, accesstoken: "" }) : (
                res.send({ loginstatus: true, accesstoken: LoginAT(user_email) }),
                User.update({ user_refresh: LoginRT(user_email) }, { where: { user_email } })
            )
        })
    } catch (error) {
        console.log(error)
    }
}