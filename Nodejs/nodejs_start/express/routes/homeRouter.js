const express =require('express');

const router =express.Router()

router.get('/home',(req,res)=>{
    res.send('Hello express')
})

module.exports =router