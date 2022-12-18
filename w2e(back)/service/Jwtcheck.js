const jwt = require("jsonwebtoken");

module.exports.Checkaccesstoken = async (accesstoken, res) => {
    try {
        const AT_verifyResult = jwt.verify(accesstoken, process.env.AT_SIGN_KEY)
        console.log(AT_verifyResult.user_email)
        return AT_verifyResult.user_email
    } catch (error) {
        return false
    }
}

module.exports.CheckSignupaccesstoken = async (accesstoken, res) => {
    try {
        const Signup_AT_result = jwt.verify(accesstoken, process.env.AT_SIGNUP_KEY)
        return Signup_AT_result
    } catch (error) {
        return false
    }
}