const { Macaddress } = require("../models");

module.exports.RegisterMacaddress = async (today_mac_address, spot_id, res) => {
    Macaddress.findOne({ where: { today_mac_address } }).then((e) => {
        if (e == null) {
            Macaddress.create({
                today_mac_address,
                spot_id
            }).then((ee) => {
                res.send({
                    mac_register_status: true,
                    server_status: true
                })
            }).catch((error) => {
                res.send({
                    mac_register_status: false,
                    server_status: true
                })
            })
        }
        else {
            res.send({
                mac_register_status: false,
                server_status: true,
                spot_id: e.spot_id
            })
        }
    }).catch((err) => {
        res.send({
            mac_register_status: false,
            server_status: false
        })
    })
}