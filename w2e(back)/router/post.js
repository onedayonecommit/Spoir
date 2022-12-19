const { Test, Friend, User, Macaddress } = require("../models");
const { createClient } = require("redis");
const multer = require("multer");
const fs = require('fs');
const upload = require('../middlewares/Imagefilter');
const { Addtest, Checkmail, GenerateRandomAuth, UserLogin, Requestaddfriend, Acceptaddfriend, Refuseaddfriend, MyfriendsSearch, Mypageinfo, Regist_wallet_address, SignUp, Addtoken, SignupAT, Checkaccesstoken } = require("../service");
const { LoginCheckmail } = require("../service/Checkemail");
const { RegisterMacaddress } = require("../service/Registermacaddress");
const router = require("express").Router();
const client = createClient();
client.connect();

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
        const token = await SignupAT(user_email)
        res.send({
            checkauthstatus: true,
            token
        })
        client.flushAll()
    }
    else {
        res.send({
            checkauthstatus: false
        })
    }
})

/** 로그인 메일인증번호 */
router.post("/check/login", async (req, res) => {
    const { user_email } = req.body;
    const authnumber = GenerateRandomAuth();
    client.flushAll();
    client.set(`${user_email}login`, `${authnumber}`, {
        EX: 300,
        NX: true
    });
    mailoption = {
        toEmail: user_email,
        subject: "tripot 메일 로그인 인증번호 입니다.",
        html: `반갑습니다 Tripot 입니다. 아래 인증번호 6자리 입력바랍니다. </br> <h1>${authnumber}</h1>`
    }
    await LoginCheckmail(mailoption, authnumber, res);
})

/** 인증번호 확인 후 로그인 처리 */
router.post("/login", async (req, res) => {
    const { user_email, authnumber } = req.body;
    if (await client.get(`${user_email}login`) == authnumber) {
        await UserLogin(user_email, res);
    }
    else {
        res.send({
            loginstatus: false
        })
    }
})

/** 변경된 로그인 방식 */
router.post("/login2", async (req, res) => {
    const { accesstoken } = req.body;
    const accesstoken1 = accesstoken.substr(10, 191)
    const user_email = await Checkaccesstoken(accesstoken1);
    if (user_email !== false) res.send({ login2status: true, user_email })
})

/** 지갑주소 등록 현재 안씀
router.post("/regist-wallet-address", async (req, res) => {
    const { accesstoken, user_wallet_address } = req.body;
    await Regist_wallet_address(accesstoken, user_wallet_address, res);
})
*/

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
        const user_email = await Checkaccesstoken(accesstoken);
        // const imgData = fs
        //     .readFileSync(`uploads${req.file.path.split("uploads")[1]}`)
        //     .toString("base64");
        // fs
        // .readFileSync(`app${req.file.path.split("app")[1]}`)
        // .toString("base64");
        await User.update({ user_profile_image: req.file.path }, { where: { user_email } }).then((e) => {
        }).catch(err => console.log(err))
        res.json({ path: imgData });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
})

/** 스팟 이미지 등록 */
router.post("/set/spot_image", upload, async (req, res) => {
    const { spot_id } = req.body;
    try {
        // blob형태를 base64로 변환
        // const imgData = fs
        //     .readFileSync(`uploads${req.file.path.split("uploads")[1]}`)
        //     .toString("base64");
        // fs
        // .readFileSync(`app${req.file.path.split("app")[1]}`)
        // .toString("base64");
        // console.log(imgData);
        // db에 path 저장
        await User.update({ spot_image: req.file.path }, { where: { spot_id } }).then((e) => {
            console.log("success")
        }).catch(err => console.log(err))
        res.json({ path: imgData });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
})

/** 맥 어드레스 디비 저장 하루에 한번씩 초기화 */
router.post("/claim/save/mac/address", async (req, res) => {
    const { mac_address, spot_id } = req.body;
    await RegisterMacaddress(mac_address, spot_id, res);
})

/** image 테스트 */
router.post("/image", (req, res) => {
    User.findAll({ where: { user_email: "rudghks09@naver.com" } }).then((e) => {
        console.log(e[0].user_profile_image.toString("utf-8"))
    })
})

/** 테스트 함수 */
// router.get("/test", (req, res) => {
//     const { user_email } = req.body;
//     User.findOne({ where: { user_email } }).then((e) => {

//     })
// })
module.exports = router