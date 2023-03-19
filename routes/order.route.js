const express=require('express')
const {sequelize}=require("../config/server")
const {orderModel}=require("../models/order.models")
let {authenticate}=require("../middlewares/authentication .middleware")
const { where } = require('sequelize')
const { compareSync } = require('bcrypt')
const orderRouter=express.Router()


orderRouter.post("/create",authenticate,async(req,res)=>{
    let {ordername,quantity,totalprice,email}=req.body
    try {
        if(ordername && email && quantity && totalprice){
            await orderModel.create({ordername,status:"Confirm",quantity,totalprice,email})
            res.send("your order confirmed")
        }else{
            res.send("fill all details")
        }
    } catch (error) {
        console.log(error)
        res.send("server error")
    }
})

orderRouter.patch('/update/:id',authenticate,async(req,res)=>{
    let id=req.params.id
   try {
    let tempid=await sequelize.query(`SELECT * FROM orders WHERE id="${id}"`)
    let validate=tempid[0][0].email
    if(validate==req.body.email){
        let status=req.body.status
        await orderModel.update({
            where:{id,status:status}
        },{Option:{return:true}})
        res.send(`order is ${status}`)
    }else if(validate==undefined){
        res.send("You are not allowed to make changes for this order")
    }else{
        res.send("You are not allowed to make changes for this order")
    }
  
   } catch (error) {
    console.log(error.message)
    console.log(error)
    res.send("server error")
   }
})

module.exports={
    orderRouter
}