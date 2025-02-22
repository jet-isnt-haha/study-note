const express =require('express');

const app =express();

app.get('/home',(req,res)=>{
    res.end('hello express');
} )

app.get('/request',(req,res)=>{
    console.log(req.method)
    console.log(req.url)
    console.log(req.httpVersion)
    console.log(req.headers)

    console.log(req.path)
    console.log(req.query)
    console.log(req.ip)

    //获取请求头
    console.log(req.get('host'));
})

app.listen(3000,()=>{
    console.log('服务已启动');
})