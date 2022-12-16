const express = require("express");
const { Test, Friend, User } = require("../models");
const { Checkmail } = require("../service/Checkemail");
const { GenerateRandomAuth } = require("../service/Generateauth");
const { UserLogin } = require("../service/Login");
const { Requestaddfriend, Acceptaddfriend, Refuseaddfriend } = require("../service/Managefriends");
const { MyfriendsSearch } = require("../service/Myfriendsearch");
const { Mypageinfo } = require("../service/Mypage");
const { Regist_wallet_address } = require("../service/RegistWallet");
const { SignUp } = require("../service/Signup");
const { Addtoken } = require("../service/Tokenstack");
const router = express.Router();

// router.use(express.json());
/** 회원가입 */
router.post("/signup", async (req, res) => {
    const { user_email, user_name } = req.body;
    await SignUp(user_email, user_name, res);
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

/** 스팟에서 토큰 받아서 DB에 토큰 갯수 저장 */
// router.post("/addtoken", async (req, res) => {
//     const { tokenamount, accesstoken } = req.body;
//     await Addtoken(tokenamount, accesstoken, res);
// })

/** 친구 추가 테스트 */
// router.post("/testaddfriend", (req, res) => {
//     // for (let i = 0; i < 100; i++) {
//     //     Friend.create({
//     //         user_email: req.body.user_email,
//     //         user_friend: `hjh4790${i}`
//     //     })
//     // }

//     res.send("complete")
// })

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
    mailoption = {
        to: user_email,
        subject: "tripot 메일 인증번호 입니다.",
        text: `반갑습니다 Tripot 입니다. 아래 인증번호 6자리 입력바랍니다. /br <h1>${GenerateRandomAuth()}</h1>`
    }
    await Checkmail(mailoption, res);
})

router.post("/myfriends/search", (req, res) => {
    const { user_email } = req.body;
    MyfriendsSearch(user_email, res)
})
router.post("/test", (req, res) => {

    User.create({
        user_email: "a123",
        user_name: "heo",
        user_password: "1234",
        user_profile_image: "/uss/image/heo.png"
    })
    User.create({
        user_email: "c123",
        user_name: "kim",
        user_password: "1234",
        user_profile_image: "/uss/image/kim.png"
    })
    User.create({
        user_email: "b123",
        user_name: "lee",
        user_password: "1234",
        user_profile_image: "/uss/image/lee.png"
    })
    Friend.create({
        user_email: req.body.user_email,
        user_friend: "a123"
    })
    Friend.create({
        user_email: req.body.user_email,
        user_friend: "c123"
    })
    Friend.create({
        user_email: req.body.user_email,
        user_friend: "b123"
    })
})
module.exports = router