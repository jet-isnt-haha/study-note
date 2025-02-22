const http =require('http');

const server =http.createServer((req,res)=>{
    const {method} =req;
    const {pathname} =new URL(req.url,'http://127.0.0.1 ');

    res.setHeader('content-type','text/html;charset=utf-8');

    if(method==='GET'&&pathname==='/login'){
        res.end('登录页面');
    }else if(method==='GET'&&pathname==='/reg'){
        res.end('注册页面');
    }else{
        res.end('Not Found');
    }

})

server.listen(9000,()=>{
    console.log('服务器已启动');
})