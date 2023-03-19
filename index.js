const express=require("express")

const app=express()

app.use(express.json())

app.get('/hello',(req,res)=>{
    res.send("Hello from server 2")
})

app.listen(4500,()=>{
    console.log("port is listing on port 4500")
})