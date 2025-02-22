var express = require('express');
const UserModel = require('../../models/UserModel');
const jwt =require('jsonwebtoken')
var router = express.Router();

router.post('/login',async (req,res)=>{
    try{
        const {username,password} =req.body
        const data =await UserModel.findOne({username,password})
        console.log(data)
        if(!data){
        return  res.json({
            code:'2002',
            msg:'用户或密码错误',
            data:null
          })
        }

        const token =jwt.sign({
            username:data.username,
            _id:data._id
        },'jet',{
            expiresIn:60*60*24*7
        })
        res.json({
            code:'0000',
            msg:'登录成功',
            data:token
        })
        //创建当前用户的token
 
    }catch(error){
        res.json({
            code:'2001',
            msg:'登录失败',
            data:null
        })
    }
})

router.post('/logout',(req,res)=>{
    req.session.destroy(()=>{
        res.render('success',{msg:'退出成功',url:'/login'})
    })
})

module.exports = router;
