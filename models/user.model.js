const {sequelize,DataTypes}=require("../config/server")
const userModel=sequelize.define('users',{
    name:{
        type:DataTypes.STRING,
        allowNull:false
    },
    email:{
        type:DataTypes.STRING,
        allowNull:false,
        unique:true
    },
    password:{
        type:DataTypes.STRING,
        allowNull:false
    }
});
sequelize.sync().then(()=>console.log("Table created"))

module.exports={
    userModel
}