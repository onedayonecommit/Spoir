const { Macaddress } = require("../models");

module.exports.Getseconds = async () => {
    var date = new Date()
    var seconds = Math.round(date.getTime() / 1000);
    return seconds
}

module.exports.Resetmacaddress = async () => {
    await Macaddress.destroy({ where: {} }).then((e) => {
        console.log('삭제 성공')
    }).catch((error) => {
        console.log(error);
    })
}