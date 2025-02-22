
const mongoose =require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/bilibili');

//once 事件回调函数只执行一次
mongoose.connection.once('open',()=>{
    //...
})

mongoose.connection.on('error',()=>{
    //...
})

mongoose.connection.on('close',()=>{
    //...
})

mongoose.disconnect()