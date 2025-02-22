const http =require('http');



const server =http.createServer((req,res)=>{
    let url =new URL(req.url,'http://127.0.0.1:9000');

    console.log(url.pathname);
    console.log(url.searchParams.get('keyword'));

    res.end('url new');
})

server.listen(9000,()=>{
    console.log('服务器已成功启动')
})