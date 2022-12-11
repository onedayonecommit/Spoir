const Sequelize = require("sequelize");

class User extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            id: {
                primaryKey: true,
                allowNull: false,
                autoIncrement: true,
                type: Sequelize.INTEGER
            },
            user_email: {
                unique: true,
                allowNull: false,
                type: Sequelize.STRING(50)
            },
            user_name: {
                allowNull: false,
                type: Sequelize.STRING(20)
            },
            user_password: {
                allowNull: false,
                type: Sequelize.STRING(36)
            },
            user_phone: {
                allowNull: false,
                defaultValue: "",
                type: Sequelize.STRING(13)
            }, user_refresh: {
                allowNull: false,
                defaultValue: "",
                type: Sequelize.STRING(200)
            }, user_wallet_address: {
                allowNull: false,
                defaultValue: "",
                type: Sequelize.STRING(45)
            }
        }, {
            sequelize,
            underscored: true,
            timestamps: true,
            modelName: "User",
            tableName: "users",
            paranoid: true,
            charset: "utf8",
            collate: "utf8_general_ci",
        })
    }
}

module.exports = User;