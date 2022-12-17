const Sequelize = require('sequelize');

class Macaddress extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            id: {
                primaryKey: true,
                allowNull: false,
                autoIncrement: true,
                type: Sequelize.INTEGER
            },
            today_mac_address: {
                allowNull: false,
                type: Sequelize.STRING(20)
            }
        }, {
            sequelize,
            underscored: true,
            timestamps: true,
            modelName: "Macaddress",
            tableName: "macaddresses",
            charset: "utf8",
            collate: "utf8_general_ci",
        })
    }
}

module.exports = Macaddress;