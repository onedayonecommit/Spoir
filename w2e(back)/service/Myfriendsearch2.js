const { User } = require("../models")

/** 친구목록 불러올 때 이미지 찾는 함수 리턴값은 [유저아이디, 프로필사진] */
module.exports.MyfriendsSearch2 = async (i, user_email) => {
    const Result = await User.findAll({ attributes: ["user_email", "user_profile_image"] }, { where: { user_email } }).then((e) => {
        return e[i].user_profile_image
    })
    return Result
}