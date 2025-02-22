const http =require('http');

const server =http.createServer((req,res)=>{
    let body ='';

    req.on('data',chunk=>{
        body+=chunk;
    })

    req.on('end',()=>{
        console.log(body);

        res.end('Hellp HTTP')
    })
})

server.listen(9000,()=>{
    console.log('服务器已成功启动')
})