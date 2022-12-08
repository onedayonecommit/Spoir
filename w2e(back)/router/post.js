const express = require("express");
const { UserLogin } = require("../service/Login");
const { SignUp } = require("../service/Signup");
const router = express.Router();

router.post("/signup", async (req, res) => {
    const { user_email, user_phone, user_password } = req.body;
    await SignUp(user_email, user_password, user_phone, res);
})

router.post("/login", (req, res) => {
    const { user_email, user_password } = req.body;
    await UserLogin(user_email, user_password, res);
})

module.exports = router