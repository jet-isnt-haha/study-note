
const mongoose =require('mongoose')

//聊天记录Model
const MessageSchema =new mongoose.Schema({
    user_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user',
        require:true
    },
    messages:[{
        message_index:{
            type:Number,
            require:true,
            unique:true
        },
        role:{
            type:String,
            require:true,
        },
        message:{
            type:String,
            require:true
        },
        created_at:{
            type:Date,
            default:Date.now
        }
    }],
    created_at:{
        type:Date,
        default:Date.now
    }
})

const MessageModel=mongoose.model('message',MessageSchema)

module.exports=MessageModel