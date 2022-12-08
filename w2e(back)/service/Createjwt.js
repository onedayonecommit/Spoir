const jwt = require('jsonwebtoken');

module.exports.LoginAT = async (id) => {
    try {
        const getAT = jwt.sign({
            user_email: id
        }, process.env.AT_SIGN_KEY, {
            expiresIn: "1h",
            issuer: "poobin"
        })
        return getAT
    } catch (error) {
        console.log(error)
    }
}

module.exports.LoginRT = async (id) => {
    try {
        const getRT = jwt.sign({
            user_email: id
        }, process.env.RT_SIGN_KEY, {
            expiresIn: "14d",
            issuer: "poobin"
        })
        return getRT
    } catch (error) {
        console.log(error)
    }
}