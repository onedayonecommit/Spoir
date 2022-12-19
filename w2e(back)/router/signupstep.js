const router = require("express").Router();
const { SignUp, GenerateRandomAuth, Checkmail, SignupAT } = require("../service");

/** 회원가입 */
router.post("/signup", async (req, res) => {
    const { accesstoken, user_name } = req.body;
    await SignUp(accesstoken, user_name, res);
})

/** 회원가입 전 메일 중복확인 및 인증번호 발송 */
router.post("/check/email", async (req, res) => {
    const { user_email } = req.body;
    const authnumber = GenerateRandomAuth();
    client.set(`${user_email}`, `${authnumber}`, {
        EX: 300,
        NX: true
    });
    mailoption = {
        toEmail: user_email,
        subject: "tripot 메일 인증번호 입니다.",
        html: `반갑습니다 Tripot 입니다. 아래 인증번호 6자리 입력바랍니다. </br> <h1>${authnumber}</h1>`
    }
    await Checkmail(mailoption, authnumber, res);
})

/** 회원가입 인증번호 체크 */
router.post("/check/authnumber", async (req, res) => {
    const { user_email, authnumber } = req.body;
    if (await client.get(user_email) == authnumber) {
        res.send({
            checkauthstatus: true,
            token: await SignupAT(user_email)
        })
        client.flushAll()
    }
    else {
        res.send({
            checkauthstatus: false
        })
    }
})