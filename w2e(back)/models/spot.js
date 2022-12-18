const Sequelize = require("sequelize");

class Spot extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            spot_id: {
                type: Sequelize.INTEGER,
                unique: true,
                allowNull: false
            },
            spot_image: {
                type: Sequelize.STRING(1000),
                allowNull: false,
            }
        }, {
            sequelize,
            underscored: true,
            timestamps: true,
            modelName: "Spot",
            tableName: "spots",
            charset: "utf8",
            collate: "utf8_general_ci",
        })
    }
}

module.exports = Spot;