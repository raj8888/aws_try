
const {sequelize,DataTypes}=require("../config/server")
const orderModel=sequelize.define('orders',{
    ordername:{
        type:DataTypes.STRING,
        allowNull:false
    },
    quantity:{
        type:DataTypes.STRING,
        allowNull:false
    },
    totalprice:{
        type:DataTypes.STRING,
        allowNull:false
    },
    status:{
        type:DataTypes.STRING,
        allowNull:false
    },
    email:{
        type:DataTypes.STRING,
        allowNull:false
    }

});
sequelize.sync().then(()=>console.log("Table created"))

module.exports={
    orderModel
}