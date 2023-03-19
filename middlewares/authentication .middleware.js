const jwt=require('jsonwebtoken')

const authenticate=async(req,res,next)=>{
    var token=req.headers.authorization?.split(" ")[1]
    try {
        if(!token){
            res.send("Login First")
        }else{
            let decoded=jwt.verify(token,'evaluation')
            let email=decoded.email
            req.body.email=email
            next()
        }
    } catch (error) {
        console.log(error)
        res.send("Login First")
    }
}

module.exports={
    authenticate
}