const Sequelize = require("sequelize");

class Pendingfriend extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            to_user_email: {
                type: Sequelize.STRING(50),
                allowNull: false
            },
            from_user_email: {
                type: Sequelize.STRING(20),
                allowNull: false,
            },
        }, {
            sequelize,
            underscored: true,
            timestamps: true,
            modelName: "Pendingfriend",
            tableName: "pendingfriends",
            charset: "utf8",
            collate: "utf8_general_ci",
        })
    }
}

module.exports = Pendingfriend;