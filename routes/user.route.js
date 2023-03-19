const express=require('express')
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")
const {sequelize}=require("../config/server")
const {userModel}=require("../model/user.model")
const userRouter=express.Router()

userRouter.post("/signup",async(req,res)=>{
    try {
        let {name,email,password}=req.body
        if(name && email && password){
            let tempEmail=await sequelize.query(`SELECT * FROM users WHERE email="${email}"`)
            let checkEmail=tempEmail[0].length==0
            if(!checkEmail){
                res.send("already registered")
            }else{
                bcrypt.hash(password,5,async(err,hash)=>{
                    await userModel.create({
                        name,
                        email,
                        password:hash
                    })
                })
                res.send("Account Created Successfully")
            }
        }else{
            res.send("Fill all details")
        }
    } catch (error) {
        console.log(error)
        res.send("Server Error")
    }
})


userRouter.post('/login',async(req,res)=>{
    let {email,password}=req.body
    try {
        if(email && password){
            let tempEmail=await sequelize.query(`SELECT * FROM users WHERE email="${email}"`)
            let checkEmail=tempEmail[0][0].email
            console.log(checkEmail)
            if(checkEmail==email){
               let hashpassword=tempEmail[0][0].password
               bcrypt.compare(password,hashpassword,async(err,result)=>{
                if(err){
                    res.send("wrong credentials")
                }else if (result){
                    let token=jwt.sign({email:email},"evaluation")
                    res.send({msg:"login successfull",token:token})
                }else{
                    res.send("wrong credentials")
                }
                    
               })
            }else{
                res.send("create account first")
            }
        }else{
            res.send("Fill all details")
        }
    } catch (error) {
        console.log(error)
        res.send("Server Error")
    }
})
module.exports={
    userRouter
}