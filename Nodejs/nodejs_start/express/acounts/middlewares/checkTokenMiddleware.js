const { json } = require('body-parser')
const jwt =require('jsonwebtoken')
module.exports =async (req,res,next)=>{

    const token =req.get('token')
    
    if(!token){
        return res.json({
            code:'2003',
            msg:'token 缺失',
            data:null
        })
    }
try{
    await jwt.verify(token,'jet')
    next()
}catch(error){
    return json({
        code:'2004',
        msg:'token 校验失败',
        data:null
    })
}
}