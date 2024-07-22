const jwt = require("jsonwebtoken")
require('dotenv').config()
exports.createTokenAndSaveCookie=(userid,res)=>{
    const token = jwt.sign({userid},process.env.JWT_SECRET,
        { 
            expiresIn: "10d"
        }
    )
    res.cookie("harshcookie",token,{
        httpOnly:true, 
        secure:true,
        sameSite:"strict"
       
    })

}