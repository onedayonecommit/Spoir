const { Macaddress } = require("../models");

module.exports.RegisterMacaddress = async (today_mac_address, spot_id, res) => {
    Macaddress.findOne({ where: { today_mac_address } }).then((e) => {
        console.log(e)
        if (e == null) {
            Macaddress.create({
                today_mac_address,
                spot_id
            }).then((ee) => {
                res.send({
                    macregisterstatus: true,
                    serverstatus: true
                })
            }).catch((error) => {
                res.send({
                    macregisterstatus: false,
                    serverstatus: true
                })
            })
        }
        else {
            res.send({
                macregisterstatus: false,
                serverstatus: true,
                spot_id: e.spot_id
            })
        }
    }).catch((err) => {
        console.log(err)
        res.send({
            macregisterstatus: false,
            serverstatus: false
        })
    })
}