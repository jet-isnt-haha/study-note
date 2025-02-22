const express =require('express');
const homeRouter =require('./routes/homeRouter')
const bodyParser=require('body-parser');

const app =express();

//解析 querystring 格式请求体的中间件
const urlencodedParser =bodyParser.urlencoded({extended:false })

app.use(homeRouter)
app.use(express.static(__dirname+'/public'))

app.get('/login',(req,res)=>{
    res.sendFile(__dirname+'/index.html')
})

app.post('/login',urlencodedParser,(req,res)=>{
    console.log(req.body)
    res.send('获取用户信息')
})

app.listen(3000,()=>{
    console.log('服务已启动');
})