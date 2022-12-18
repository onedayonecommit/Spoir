const { User } = require("../models")
const { LoginAT, LoginRT } = require("./Createjwt")

module.exports.UserLogin = async (user_email, res) => {
    try {
        User.findOne({ where: { user_email } }).then(async (e) => {
            console.log(LoginAT(user_email));
            if (e == null) { res.send({ loginstatus: false, accesstoken: "" }) } else {
                const loginaccesstoken = await LoginAT(user_email)
                res.send(
                    { loginstatus: true, accesstoken: loginaccesstoken }
                )
            }
        })
    } catch (error) {
        console.log(error)
    }
}