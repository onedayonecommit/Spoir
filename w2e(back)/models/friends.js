const Sequelize = require("sequelize");

class Friend extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            id: {
                primaryKey: true,
                type: Sequelize.INTEGER,
                autoIncrement: true,
                allowNull: false
            },
            user_email: {
                type: Sequelize.STRING(50),
                allowNull: false
            },
            user_friend: {
                type: Sequelize.STRING(50),
                allowNull: false
            },
            acceptedstatus: {
                type: Sequelize.TINYINT(1),
                allowNull: false,
                defaultValue: 0 // 친구 요청 대기 상태 : 0 , 친구 요청 수락 시 : 1
            }
        }, {
            sequelize,
            underscored: true,
            timestamps: true,
            modelName: "Friend",
            tableName: "friends",
            charset: "utf8",
            collate: "utf8_general_ci",
            paranoid: false // 이거 필요없다 판단
        })
    }
}

module.exports = Friend;