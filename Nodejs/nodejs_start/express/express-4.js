const express =require('express');
const fs=require('fs');

const app =express();


//声明全局中间件函数
function recordMiddleware(req,res,next){
    //获取url和ip
    const {url,ip}=req;

    //保存信息
    fs.appendFileSync(path.resolve(__dirname,'./access.log'),`${url} -- ${ip}`);

    //调用next(调用后续路由回调)
    next();
}

//使用全局中间件函数
app.use(recordMiddleware);

app.get('/home',(req,res)=>{
    res.send('前台首页');
})

//局部中间件函数的使用
const checkCodeMiddleware=(req,res,next)=>{
    if(req.query.code==='521'){
        next();
    }else{
        res.send('暗号错误');
    }
}


app.get('/admin',checkCodeMiddleware,(req,res)=>{
    res.send('后台首页');
})

app.get('/setting',checkCodeMiddleware,(req,res)=>{
    res.send('设置首页')
})

app.listen(3000,()=>{
    console.log('服务已启动');
})