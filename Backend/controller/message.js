const Conversation = require("../models/conversation.model");
const Message = require("../models/message.model");
const { getRececiverSocketId ,io } = require("../socketIO/server");


exports.sendMessage=async(req,res)=>{
    // console.log("message sent",req.params.id,req.body.message)
    try{
            const {message} = req.body;
            const {id:receiverId}= req.params;
            const senderId = req.user._id //cuurent loggedin user

            let conversation = await Conversation.findOne({
                members:{$all:[senderId,receiverId]}
            })
            if(!conversation){
                conversation = await Conversation.create({
                    members:[senderId,receiverId]
                })
            }
            const newMessage = new Message({
                senderId,
                receiverId,
                message
            })
            if(newMessage){
                conversation.messages.push(newMessage._id)
            }
            // await conversation.save()
            // await newMessage.save()
            
            await Promise.all([conversation.save() , newMessage.save()]) //run parallel
            const receiverSocketId =getRececiverSocketId(receiverId)
           if(receiverSocketId){
            io.to(receiverSocketId).emit("newMessage",newMessage)
           }

            res.status(201).json({
                message:"Message sent successfully",
                newMessage
            })

    }
    catch(error){
        console.log("Error in sendMessage",error)
        res.status(500).json({
            error:"internal server error"
        })
    }
}

exports.getMessage=async(req,res)=>{
    try{

        const {id:receiverId}= req.params;
        const senderId = req.user._id //cuurent loggedin user

        let conversation = await Conversation.findOne({
            members:{$all:[senderId,receiverId]}
        }).populate("messages")
        if(!conversation){
          return  res.status(201).json([]);
        }
        const message = conversation.messages;
       

        res.status(201).json(message);


    }
    catch(error){
        console.log("Error in sendMessage",error)
        res.status(500).json({
            error:"internal server error"
        })
    }
    
           
    
}


