const mongoose = require('mongoose')

require('dotenv').config()
exports.dbConnect = ()=>{
    mongoose.connect(process.env.MONGODB_URL)
    .then(()=>console.log("db connected successfully"))
    .catch((error)=>console.log(error))
}

