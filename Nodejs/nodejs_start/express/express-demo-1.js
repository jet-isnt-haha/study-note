const express =require('express');
const {singer}=require('./singers.json');
const app =express();

app.get('/singer/:id.html',(req,res)=>{
    let {id} =req.params;
    let result =singer.find(item=>{
        if(item.id=Number(id)){
            return true;
        }
    })
    console.log(result)
} )
app.listen(3000,()=>{
    console.log('服务已启动');
})