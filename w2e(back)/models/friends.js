const Sequelize = require("sequelize");

class Friend extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            user_email: {
                type: Sequelize.STRING(30),
                allowNull: false
            },
            user_friend: {
                type: Sequelize.STRING(30),
                allowNull: false
            }
        }, {
            sequelize,
            underscored: true,
            timestamps: true,
            modelName: "Friend",
            tableName: "friends",
            paranoid: true,
            charset: "utf8",
            collate: "utf8_general_ci",
        })
    }
}

module.exports = Friend;