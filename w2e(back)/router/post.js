const express = require("express");
const { Test, Friend, User } = require("../models");
const { createClient } = require("redis");
const { Addtest } = require("../service/Addtest");
const { Checkmail } = require("../service/Checkemail");
const { GenerateRandomAuth } = require("../service/Generateauth");
const { UserLogin } = require("../service/Login");
const { Requestaddfriend, Acceptaddfriend, Refuseaddfriend } = require("../service/Managefriends");
const { MyfriendsSearch } = require("../service/Myfriendsearch");
const { Mypageinfo } = require("../service/Mypage");
const { Regist_wallet_address } = require("../service/RegistWallet");
const { SignUp } = require("../service/Signup");
const { Addtoken } = require("../service/Tokenstack");
const { SignupAT } = require("../service/Createjwt");
const router = express.Router();
const client = createClient();
client.connect();


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
    const { user_email, authnumber } = req.body;
    if (await client.get(user_email) == authnumber) {
        res.send({
            checkauthstatus: true,
            signupchecktoken: await SignupAT(user_email)
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
module.exports = router