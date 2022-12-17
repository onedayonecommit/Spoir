module.exports.GenerateRandomAuth = () => {
    var randomnum = ""
    for (let i = 0; i < 6; i++) {
        randomnum = randomnum + String(Math.floor(Math.random() * 10))
    }
    return Number(randomnum);
}