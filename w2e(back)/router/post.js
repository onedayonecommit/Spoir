const { Test, Friend, User } = require("../models");
const { createClient } = require("redis");
const multer = require("multer");
const upload = require('../middlewares/Imagefilter');
const { Addtest, Checkmail, GenerateRandomAuth, UserLogin, Requestaddfriend, Acceptaddfriend, Refuseaddfriend, MyfriendsSearch, Mypageinfo, Regist_wallet_address, SignUp, Addtoken, SignupAT } = require("../service");
const router = require("express").Router();
const client = createClient();
client.connect();

/** 회원가입 */
router.post("/signup", async (req, res) => {
    const { accesstoken, user_name } = req.body;
    console.log(accesstoken, user_name);
    await SignUp(accesstoken, user_name, res);
})

/** 로그인 */
router.post("/login", async (req, res) => {
    const { user_email, user_password } = req.body;
    await UserLogin(user_email, user_password, res);
})

/** 지갑주소 등록 */
router.post("/regist-wallet-address", async (req, res) => {
    const { accesstoken, user_wallet_address } = req.body;
    await Regist_wallet_address(accesstoken, user_wallet_address, res);
})

/** 마이페이지 접속시 해당 유저 정보 */
router.post("/mypage-info", async (req, res) => {
    const { accesstoken } = req.body;
    await Mypageinfo(accesstoken, res)
})

/** 친구 요청 발송 */
router.post("/friend/request", async (req, res) => {
    const { accesstoken, user_friend } = req.body;
    await Requestaddfriend(accesstoken, user_friend, res);
})

/** 친구 요청 수락 */
router.post("/friend/accept", async (req, res) => {
    const { accesstoken, user_email } = req.body;
    await Acceptaddfriend(accesstoken, user_email, res);
})

/** 친구 요청 거절 */
router.post("/friend/refuse", async (req, res) => {
    const { accesstoken, user_email } = req.body;
    await Refuseaddfriend(accesstoken, user_email, res);
})

/** 회원가입 전 메일 중복확인 및 인증번호 발송 */
router.post("/check/email", async (req, res) => {
    const { user_email } = req.body;
    const authnumber = GenerateRandomAuth();
    // client.set(`${user_email}`, `${authnumber}`, "EX", 10, function (err, reply) {
    //     if (err) res.status(400).send({ success: false });
    // })
    client.set(`${user_email}`, `${authnumber}`, {
        EX: 30,
        NX: true
    });
    mailoption = {
        toEmail: user_email,
        subject: "tripot 메일 인증번호 입니다.",
        html: `반갑습니다 Tripot 입니다. 아래 인증번호 6자리 입력바랍니다. </br> <h1>${authnumber}</h1>`
    }
    await Checkmail(mailoption, res);
})

/** 인증번호 체크 */
router.post("/check/authnumber", async (req, res) => {
    console.log(req.body);
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

/** 친구 목록 보내주기 */
router.post("/myfriends/search", async (req, res) => {
    const { user_email } = req.body;
    await MyfriendsSearch(user_email, res)
})

/** 친구 추가 test */
router.post("/test", (req, res) => {
    Addtest()
})

/** 프로필 이미지 업로드 */
router.post("/set/user/profile_image", upload, async (req, res) => {
    const { accesstoken } = req.body;
    try {
        // blob형태를 base64로 변환
        const imgData = fs
            .readFileSync(`app${req.file.path.split("app")[1]}`)
            .toString("base64");

        // db에 path 저장
        await User.update({ user_profile_image: imgData }, { where: { user_email: accesstoken } });
        res.json({ path: imgData });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }

})
module.exports = router