const sequelize = require("../utils/connection");
const {DataTypes} = require("sequelize");

const Post = sequelize.define("post", {
    post : {
        type: DataTypes.TEXT,
        allowNull:false,
    },
    //userID
})

module.exports = Post;