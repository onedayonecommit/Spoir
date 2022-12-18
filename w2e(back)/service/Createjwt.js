const jwt = require('jsonwebtoken');

/** 로그인 했을 때 토큰 */
module.exports.LoginAT = async (user_email) => {
    try {
        const getAT = jwt.sign({
            user_email
        }, process.env.AT_SIGN_KEY, {
            expiresIn: "30d",
            issuer: "tripot"
        })
        return getAT
    } catch (error) {
        console.log(error)
    }
}

/** 로그인 후 리프레쉬 현재는 안쓸거같음 */
module.exports.LoginRT = async (user_email) => {
    try {
        const getRT = jwt.sign({
            user_email
        }, process.env.RT_SIGN_KEY, {
            expiresIn: "90d",
            issuer: "tripot"
        })
        return getRT
    } catch (error) {
        console.log(error)
    }
}

/** 인증번호 통과했을 때 1시간 제한 및 인증성공 확인서 */
module.exports.SignupAT = async (user_email) => {
    try {
        const getSignupAT = jwt.sign({
            user_email
        }, process.env.AT_SIGNUP_KEY, {
            expiresIn: "1h",
            issuer: "tripot"
        })
        return getSignupAT
    } catch (error) {
        console.log(error)
    }
}