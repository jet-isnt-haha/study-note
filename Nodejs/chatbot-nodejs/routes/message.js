const express=require('express')
const MessageModel =require('../models/MessageModel')
const router =express.Router();
const checkTokenMiddleware = require('../middlewares/checkTokenMiddleware');
const mongoose =require('mongoose')

router.post('/message/upsert',checkTokenMiddleware,async(req,res)=>{
    const user_id =new mongoose.Types.ObjectId(req.currUser._id)
    const {role,text,message_index} =req.body

    try {
        //先查看是否又message内容被改变并更新
        const updateResult = await MessageModel.updateOne(
            {user_id,"messages.message_index":message_index},//查询条件：用户id以及message索引
            {
                //用于设置（更新）文档中的特定字段$set
                $set:{
                    "messages.$":{//使用￥定位到具体的消息
                        message_index,
                        role,
                        message:text,
                        created_at:Date.now()
                    }
                }
            }
        ) 
        // 如果更新操作没有修改如何文档，则插入新消息
        if(updateResult.modifiedCount===0){
        const result =await MessageModel.findByIdAndUpdate(
            {user_id},//查询条件：根据用户ID查找文档
            {
                $push:{
                    message_index,
                    role,
                    messages:text,
                    created_at:Date.now()
                }
            },
            {
                upsert:true,//如果文档不存在则创建新文档
                new:true,// 返回更新后的文档
                setDefaultsOnInsert:true//在创建新文档时应用默认值                
            }
        )
                //test
                console.log(result)
                res.json({
                    code:'0000',
                    msg:'更新message成功',
                    data:result
                })
    }else{
            //test
            console.log(updateResult)
            res.json({
                code:'0000',
                msg:'更新message成功',
                data:updateResult
            })
    }

    } catch (error) {
        console.log(error)
        return res.json({
            code:'5001',
            msg:'更新message失败',
            data:null
        })
    }
})

module.exports =router