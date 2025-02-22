const fs =require('fs');

const files =fs.readdirSync('./');

files.forEach(item=>{
    let data= item.split('-');
    let[num,name]=data;

    if(Number(num)<10){
        num='0'+num;
    }

    let=newName =num+'-'+name
})

