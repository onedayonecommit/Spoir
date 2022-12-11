const { User } = require("../models")
const bcrypt = require("bcrypt");
module.exports.SignUp = async (user_email, user_password, user_name, res) => {
    try {
        User.findOne({ where: { user_email } }).then((e) => {
            return e == null ? User.create({
                user_email,
                user_password, // 암호화 작업 할거면 => bcrypt.hashSync(pw, 10)
                user_name
            }).then((e) => {
                res.send({
                    signupstatus: true,
                })
            }).catch((error) => {
                res.send({
                    signupstatus: false
                })
            }) : res.send({
                signupstatus: false
            })
        })
    } catch (error) {
        res.send({
            signupstatus: false
        })
    }
}