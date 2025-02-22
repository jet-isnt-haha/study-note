const http= require('http');
const fs =require('fs');

const server =http.createServer((req,res)=>{
    let html =fs.readFileSync(__dirname+'/text.html');
    res.end(html);
})

server.listen(9000,()=>{
    console.log('服务器启动成功');
})