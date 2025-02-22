const express =require('express');

const app =express();

app.get('/response',(req,res)=>{
    //express 响应
    res.status(500);
    res.set('aaa','bbb');
    res.send('你好 express')
})

app.get('/other',(req,res)=>{
    //跳转响应
    res.redirect('http...')

    //下载响应
    res.download(__dirname+'绝对路径');

    //JSON响应
    res.json({
       // ...
    });

    //响应文件内容
    res.sendFile(__dirname+'文件绝对路径');
})

app.listen(3000,()=>{
    console.log('服务已启动');
})