const jwt = require( 'jsonwebtoken')
const User= require('../models/user.model')

exports.secureRoute = async (req,res,next)=>{
    try{
         const token = req.cookies.harshcookie;
         if(!token){
            return res.status(401).json({error:"no token , authorization denied"})
         }
         const decode = jwt.verify(token,process.env.JWT_SECRET)
         if(!decode){
            return res.status(401).json({error:"invalid token"})
         }
         const user = await User.findById(decode.userid).select('-password')
         if(!user){
            return res.status(401).json({error:"no user found"})
         }
         req.user = user;
         next()
    }
    catch(error){
        console.log("error in secureRoute",error)
        res.status(500).json({
            error:"internal server error"
        })

    }
}