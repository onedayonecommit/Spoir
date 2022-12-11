const express = require("express");
const { UserLogin } = require("../service/Login");
const { Regist_wallet_address } = require("../service/RegistWallet");
const { SignUp } = require("../service/Signup");
const router = express.Router();

// router.use(express.json());
/** 회원가입 */
router.post("/signup", async (req, res) => {
    const { user_email, user_password, user_name } = req.body;
    console.log(req.body)
    await SignUp(user_email, user_password, user_name, res);
})

/** 로그인 */
router.post("/login", async (req, res) => {
    const { user_email, user_password } = req.body;
    await UserLogin(user_email, user_password, res);
})

/** 지갑주소 등록 */
router.post("/regist-wallet-address", async (req, res) => {
    const { user_email, user_wallet_address } = req.body;
    await Regist_wallet_address(user_email, user_wallet_address, res);
})

module.exports = router