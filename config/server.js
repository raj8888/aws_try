const {Sequelize,DataTypes}=require("sequelize")
const db=require("./db")
const sequelize=new Sequelize(
    db.myData.database,
    db.myData.username,
    db.myData.password,
    {
        host:db.myData.host,
        dialect:db.myData.dialect
    });

module.exports={
    sequelize,DataTypes
}