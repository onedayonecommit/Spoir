const Sequelize = require("sequelize");

class Test extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            user_email: {
                type: Sequelize.STRING(100),
                allowNull: true
            }, user_friend: {
                type: Sequelize.STRING(100),
                allowNull: true
            }
        }, {
            sequelize,
            underscored: true,
            timestamps: true,
            modelName: "Test",
            tableName: "tests",
            paranoid: true,
            charset: "utf8",
            collate: "utf8_general_ci",
        })
    }
}

module.exports = Test;