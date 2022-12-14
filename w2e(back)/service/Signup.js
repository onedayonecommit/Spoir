const { User } = require("../models");
const { LoginAT } = require("./Createjwt");
const { Checkaccesstoken, CheckSignupaccesstoken } = require("./Jwtcheck");
module.exports.SignUp = async (accesstoken, user_name, res) => {
    console.log(accesstoken)
    const verify = await CheckSignupaccesstoken(accesstoken);
    console.log(verify)
    if (verify !== false) {
        try {
            User.findOne({ where: { user_email: verify.user_email } }).then((e) => {
                return e == null ? User.create({
                    user_email: verify.user_email,
                    user_name,
                    user_profile_image: "uploads/default.png"
                }).then(async (e) => {
                    res.send({
                        signupstatus: true,
                        userToken: await LoginAT(verify.user_email)
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
    } else {
        res.send({
            signupstatus: false,
            msg: "user_email 잘못됌.? "
        })
    }
}