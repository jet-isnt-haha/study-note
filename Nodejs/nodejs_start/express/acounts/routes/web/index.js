const express = require('express');
const moment=require('moment');
const AccountModel = require('../../models/AccountModel');
const checkLoginMiddleware = require('../../middlewares/checkLoginMiddleware');

var router = express.Router();


/* GET home page. */
router.get('/',(req,res)=>{
  res.redirect('/account')
})

router.get('/account',checkLoginMiddleware, async function(req, res, next) {
  try{
  const data =await AccountModel.find().sort({time:-1}).exec()
  res.render('list',{accounts:data,moment})
  }catch(err){
    res.status(500).send('读取失败')
    return;
  }
});

router.get('/account/create',checkLoginMiddleware,function(req,res){
  res.render('create')
})

router.post('/account',checkLoginMiddleware,async (req,res)=>{
try{
  const newAccount=await AccountModel.create({
    ...req.body,
    time:moment(req.body.time).toDate()
  })
}catch(err){
  res.status(500).send('插入失败')
  return;
}
  res.render('success',{msg:'添加成功',url:'/account'})
})


router.get('/account/:id',checkLoginMiddleware,async (req,res)=>{
  try{
  let id =req.params.id
  const data =await AccountModel.deleteOne({_id:id})
  res.render('success',{msg:'删除成功',url:'/account'})
  }catch(error){
    res.status(500).send('删除失败')
  }
})


module.exports = router;
