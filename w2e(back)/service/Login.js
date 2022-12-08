const { User } = require("../models")
const { LoginAT, LoginRT } = require("./Createjwt")

module.exports.UserLogin = async (id, pw, res) => {
    try {
        User.findOne({ where: { user_email: id, user_password: pw } }).then((e) => {
            e == null ? res.send({ loginstatus: false, accesstoken: "" }) : (
                res.send({ loginstatus: true, accesstoken: LoginAT(id) }),
                User.update({ user_refresh: LoginRT(id) }, { where: { user_email: id } })
            )
        })
    } catch (error) {
        console.log(error)
    }
}