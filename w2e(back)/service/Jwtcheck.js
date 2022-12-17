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