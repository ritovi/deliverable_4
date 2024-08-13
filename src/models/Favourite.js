const sequelize  = require("../utils/connection");
const {DataTypes} =  require("sequelize");

const Favourite = sequelize.define("favourite", {
    userId : {
        type : DataTypes.INTEGER,
        allowNull: false,
    },
    postId: {
        type : DataTypes.INTEGER,
        allowNull: false,
    }
})

module.exports = Favourite;