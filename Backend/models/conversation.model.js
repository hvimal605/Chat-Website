const mongoose = require("mongoose")
const Message = require("./message.model")
const User = require("./user.model")

const conversationSchema = new mongoose.Schema({
    members:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:User
        }

    ],
    messages:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:Message,
            default:[]
        }
    ]
},{timestamps:true})

const Conversation = mongoose.model("conversation",conversationSchema)
module.exports= Conversation; 