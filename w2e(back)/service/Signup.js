const { User } = require("../models")
const bcrypt = require("bcrypt");
module.exports.SignUp = async (id, pw, phone, res) => {
    try {
        User.create({
            user_email: id,
            user_password: pw, // 암호화 작업 할거면 => bcrypt.hashSync(pw, 10)
            user_phone: phone,
        })
        res.send({
            signupstatus: true,
        })
    } catch (error) {
        res.send({
            signupstatus: false
        })
    }
}