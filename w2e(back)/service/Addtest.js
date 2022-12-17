const { User, Friend } = require("../models")

/**  */
module.exports.Addtest = () => {
    User.create({
        user_email: "a123",
        user_name: "heo",
        user_password: "1234",
        user_profile_image: "/uss/image/heo.png"
    })
    User.create({
        user_email: "zxz4790@gmail.com",
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
}