
//导入fs模块
const fs = require('fs')

//写入文件
fs.writeFile('./date.txt','2025-02-14',err=>{
    //err 写入失败：错误对象 写入成功：null
    if(err){
    console.log('写入失败');
    return;
    } 
    console.log('写入成功');
})

fs.writeFileSync('./data.txt','test');

//追加API
fs.appendFile('./date.txt','04:00',err=>{
    if(err){
        console.log('追加失败');
        return
    }
    console.log('追加成功')
})
//\r\r意为换行
fs.appendFileSync('./data.txt','\r\nappend')

//使用writFile也可以实现追加
fs.writeFile('./date.txt','append',{flag:'a'},err=>{
    //err 写入失败：错误对象 写入成功：null
    if(err){
    console.log('写入失败');
    return;
    } 
    console.log('写入成功');
})


//流式写入

const ws =fs.createWriteStream('./essay.txt');

ws.write('1234567\r\n');
ws.write('7654321\r\n');

ws.close();

fs.readFile('./essay.txt',(err,data)=>{
    if(err){
        console.log('读取失败');
        return;
    }
    console.log(data.toString())
})



let data =fs.readFileSync('./essay.txt');

console.log(data.toString())


//创建读取流对象
const rs =fs.createReadStream('./essay.txt');

//绑定data事件 
rs.on('data',chunk=>{
    console.log(chunk.length);
})

//end 可选事件
rs.on('end',()=>{
    console.log('读取完成');
})


/* 复制文件 */

//method-1
let data1 =fs.readFileSync('./data.txt');
fs.writeFileSync('./data1.txt',data)

//method-2
const rs1=fs.createReadStream('./data.txt');

const ws1=fs.createWriteStream('./data.txt');

//2-1
rs1.on('data',chunk=>{
    ws1.write(chunk)
})

rs1.end()

//2-2
rs1.pipe(ws1);

rs1.end()

/* 文件移动 */

fs.rename('./data.txt','./data1.txt',err=>{
    if(err){
        console.log('操作失败');
        return;
    }
    console.log("操作成功")
})

/* 文件的移动 */
fs.rename('./data1.txt','../nodejs_document/data.txt',err=>{
    if(err){
        console.log('操作失败');
        return;
    }
    console.log('操作成功');
})

/* 文件删除 */

fs.rm('./data.txt',err=>{
    //...
})

fs.unlink('./data.txt',err=>{
    //...
})


/* 创建文件夹 */
fs.mkdir('./data',err=>{
    //...
})

/* 递归创建 */
fs.mkdir('/a/b/c',{recursive:true},err=>{
    //...
})

/* 读取文件夹 */
fs.readdir('../nodejs_document',(err,data)=>{
    //...
})

/* 删除文件夹 */
fs.rmdir('xxx',err=>{
    //...
})

/* 递归删除 */
fs.rm('./a',{recursive:true},err=>{
    //...
})

/* 查看资源信息 */
fs.stat('../nodejs_document',(err,data)=>{
    //...
})

//相对路径
fs.writeFileSync('./index.html','aaa');
fs.writeFileSync('index.html','aaa');
fs.writeFileSync('../index.html','aaa');

//绝对路径
fs.writeFileSync('C:/index.html','love');
fs.writeFileSync('/index.html','love');

//相对路径参照物：命令行的工作目录

//绝对路径 '全局变量'保存的是：所在文件的所在目录的绝对路径
console.log(__dirname);
fs.writeFileSync(__dirname+'/index.html','love');

const path =require('path');

console.log(__dirname+'/index.html');
console.log(path.resolve(__dirname,'index.html'));

