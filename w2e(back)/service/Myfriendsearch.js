const { Friend, User } = require("../models")
const { Checkaccesstoken } = require("./Jwtcheck")

module.exports.MyfriendsSearch = async (user_email, res) => {
    const searchimage = async function (e) {
        var a = [];
        for (let i = 0; i < e.length; i++) {
            User.findAll(
                {
                    attributes: ["user_profile_image", "user_email"]
                },
                {
                    where: {
                        user_email: e[i].user_friend
                    }
                }
            ).then((ee) => {
                console.log(ee[i].user_profile_image)
                a.push([e[i].user_friend, ee[i].user_profile_image])
            })
        }
        return a;
    }
    // const user_email = await Checkaccesstoken(accesstoken);
    if (user_email !== false) {
        Friend.findAll({ attributes: ["user_friend"] }, { where: { user_email } }).then((e) => {
            // var a = [];
            // for (let i = 0; i < e.length; i++) {
            //     User.findAll(
            //         {
            //             attributes: ["user_profile_image", "user_email"]
            //         },
            //         {
            //             where: {
            //                 user_email: e[i].user_friend
            //             }
            //         }
            //     ).then((ee) => {
            //         console.log(ee[0])
            //         a.push([e[i].user_friend, ee[i].user_profile_image])
            //     })
            // }
            // console.log("^^^^^^", a)
            var result = searchimage(e).sort()
            console.log("!!!", result)
            res.send({ friendstatus: result })
        }).catch((error) => {
            console.log(error)
        })
    }
}