var express = require('express');
const moment=require('moment');
const AccountModel = require('../../models/AccountModel');
const checkTokenMiddleware = require('../../middlewares/checkTokenMiddleware');


var router = express.Router();

/* GET home page. */
router.get('/account',checkTokenMiddleware, async function(req, res, next) {
  try{
  const data =await AccountModel.find().sort({time:-1}).exec()
  res.json({
    code:'0000',
    msg:'读取成功',
    data
  })
  console.log(data)
  }catch(err){
    return res.json({
        code:'1001',
        msg:'读取失败',
        data:null
    })

  }
});

router.get('/account/create',checkTokenMiddleware,function(req,res){
  res.render('create')
})

router.post('/account',checkTokenMiddleware,async (req,res)=>{
try{
  const data=await AccountModel.create({
    ...req.body,
    time:moment(req.body.time).toDate()
  })
  res.json({
    code:'0000',
    msg:'创建成功',
    data
  })
}catch(err){
    return  res.json({
    code:'1002',
    msg:'创建失败',
    data:null
  })

}
})


router.delete('/account/:id',checkTokenMiddleware,async (req,res)=>{
  try{
  let id =req.params.id
  await AccountModel.deleteOne({_id:id})
  res.json({
    code:'0000',
    msg:'删除成功',
    data:{}
  })
  }catch(error){
  return  res.json({
        code:'1003',
        msg:'删除账单失败',
        data:null
    })
  }
})

router.get('/account/:id',checkTokenMiddleware,async(req,res)=>{
    try{
        const {id}=req.params
        const data =await AccountModel.findById(id)
        res.json({
            code:'0000',
            msg:'读取成功',
            data
        })
    }catch(error){
      return  res.json({
            code:'1004',
            msg:'读取失败',
            data:null
        })
    }

})

router.patch('/account/:id',checkTokenMiddleware, async(req,res)=>{
    try{
    const {id} =req.params
    const data =await AccountModel.findByIdAndDelete({_id:id},req.body,{new:true})
    res.json({
        code:'0000',
        msg:'更新成功',
        data
    })
    }catch(error){
        return res.json({
            code:'1005',
            msg:'更新失败',
            data:null
        })
    }
})

module.exports = router;
