const jwt = require("jsonwebtoken");

module.exports.Checkaccesstoken = async (accesstoken, res) => {
    try {
        const AT_verifyResult = jwt.verify(accesstoken, process.env.AT_SIGN_KEY)
        return AT_verifyResult
    } catch (error) {
        return false
    }
}