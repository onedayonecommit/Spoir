const Sequelize = require("sequelize");

class Pendingfriend extends Sequelize.Model {
    static init(sequelize) {
        return super.init({

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