const { User } = require("../models")
const { sendGmail } = require("./Sendmail")

module.exports.Checkmail = async (option, res) => {
    await User.findOne({ where: { user_email: option.user_email } }).then((e) => {
        if (e !== null) {
            res.send({
                checkstatus: false,
                sendstatus: false
            })
        }
        else {
            sendGmail(option).then((e) => {
                res.send({
                    checkstatus: true,
                    sendstatus: true
                })
            }).catch((error) => {
                res.send({

                })
            })
        }
    })
}