const express=require('express')
const {sequelize}=require("./config/server")
const {userRouter}=require("./routes/user.route")
const {orderRouter}=require("./routes/order.route")
const app=express()

app.use(express.json())
app.use("/users",userRouter)
app.use("/order",orderRouter)

app.listen(8080,()=>{
    sequelize.authenticate()
    .then(()=>console.log("Connedted to db"))
    .catch(()=>console.log("Not connected to db"))
    console.log("Listning on port 8080")
})
