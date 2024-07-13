const mongoose = require("mongoose")

const userSchema = mongoose.Schema(
    {
        fullname: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        confirmPassword: {
            type: String,


        },
        image:{
            type:String,
            required:true,
    
        },
        dateOfBirth: {
            type: String,
            default:"01-10-1990"
        },
        bio: {
            type: String,
            trim: true,
            default:"I am  a Developer"
        },
        token: {
            type: String,
        },
        resetPasswordExpires: {
            type: Date,
        }
    }, { timestamps: true })

const User = mongoose.model("User", userSchema)
module.exports = User;    