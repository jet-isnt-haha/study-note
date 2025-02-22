var express = require('express');
const UserModel = require('../../models/UserModel');
var router = express.Router();



router.get('/reg', (req,res)=>{
    res.render('auth/reg')
})

router.post('/reg',async (req,res)=>{
    try{
        const data =await UserModel.create(req.body)
        res.render('success',{msg:'注册成功',url:'/login'})
    }catch(error){
        res.status(500).send('注册失败')
        return;
    }
})

router.get('/login',(req,res)=>{
    res.render('auth/login')
})

router.post('/login',async (req,res)=>{
    try{
        const {username,password} =req.body
        const data =await UserModel.findOne({username,password})
        if(!data){
          return  res.send('账号或密码错误')
        }
        req.session.username=data.username
        req.session._id=data._id
        res.render('success',{msg:'登录成功',url:'/account'})
    }catch(error){
        res.status(500).send('登录失败请稍后再试')
    }
})

router.post('/logout',(req,res)=>{
    req.session.destroy(()=>{
        res.render('success',{msg:'退出成功',url:'/login'})
    })
})

module.exports = router;
