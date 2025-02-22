const http =require('http');

const url =require('url');



const server =http.createServer((req,res)=>{
    let res =url.parse(req.url,true);

    let pathname =res.pathname;

    let keyword =res.query.keyword;

    res.end('url');
})

server.listen(9000,()=>{
    console.log('服务器已成功启动')
})