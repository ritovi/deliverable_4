const sequelize = require("../utils/connection");
const  {DataTypes} = require("sequelize");

const User = sequelize.define("user", {
    firstName : {
        type: DataTypes.STRING,
        allowNull: false,
    },
    lastName : {
        type: DataTypes.STRING,
        allowNull: true
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique : true,
    },
    password:  {
        type: DataTypes.STRING,
        allowNull: false,
    },
    image :{
        type: DataTypes.STRING,
        allowNull: false,
    },
    dateOfBirth : {
        type : DataTypes.DATEONLY,
        allowNull: false
    },
    isVerified : {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    }
});

module.exports = User;