const { Addtest } = require("./Addtest");
const { Checkmail } = require("./Checkemail");
const { LoginAT, LoginRT, SignupAT } = require("./Createjwt");
const { GenerateRandomAuth } = require("./Generateauth");
const { Checkaccesstoken, CheckSignupaccesstoken } = require("./Jwtcheck");
const { UserLogin } = require("./Login");
const { Acceptaddfriend, Refuseaddfriend, Requestaddfriend } = require("./Managefriends");
const { MyfriendsSearch } = require("./Myfriendsearch");
const { MyfriendsSearch2 } = require("./Myfriendsearch2");
const { Mypageinfo } = require("./Mypage");
const { Regist_wallet_address } = require("./RegistWallet");
const mailSender = require("./Sendmail");
const { SignUp } = require("./Signup");
const { Addtoken } = require("./Tokenstack");


Addtest,
    Checkmail,
    LoginAT,
    LoginRT,
    SignupAT,
    GenerateRandomAuth,
    Checkaccesstoken,
    CheckSignupaccesstoken,
    UserLogin,
    Acceptaddfriend,
    Refuseaddfriend,
    Requestaddfriend,
    MyfriendsSearch,
    MyfriendsSearch2,
    Regist_wallet_address,
    Mypageinfo,
    mailSender,
    SignUp,
    Addtoken,

    module.exports = {
        Addtest,
        Checkmail,
        LoginAT,
        LoginRT,
        SignupAT,
        GenerateRandomAuth,
        Checkaccesstoken,
        CheckSignupaccesstoken,
        UserLogin,
        Acceptaddfriend,
        Refuseaddfriend,
        Requestaddfriend,
        MyfriendsSearch,
        MyfriendsSearch2,
        Regist_wallet_address,
        Mypageinfo,
        mailSender,
        SignUp,
        Addtoken
    }