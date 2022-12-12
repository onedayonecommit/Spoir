const express = require("express");
const { Test } = require("../models");
const { UserLogin } = require("../service/Login");
const { Mypageinfo } = require("../service/Mypage");
const { Regist_wallet_address } = require("../service/RegistWallet");
const { SignUp } = require("../service/Signup");
const { Addtoken } = require("../service/Tokenstack");
const router = express.Router();

// router.use(express.json());
/** 회원가입 */
router.post("/signup", async (req, res) => {
    const { user_email, user_password, user_name } = req.body;
    await SignUp(user_email, user_password, user_name, res);
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

/** 스팟에서 토큰 받아서 누적시키는 함수 */
router.post("/addtoken", async (req, res) => {
    const { tokenamount, accesstoken } = req.body;
    await Addtoken(tokenamount, accesstoken, res);
})

// router.post("/hihi", (req, res) => {
//     for (let i = 0; i < 100000; i++) {
//         Test.create({
//             user_email: `hjh4790${i}`,
//             user_friend: req.body.friend
//         })
//     }
//     res.send("complete")
// })
module.exports = router