// let buf =Buffer.alloc(10)
// console.log(buf)

// let buf_2=Buffer.allocUnsafe(10)
// console.log(buf_2)

// let buf_3 =Buffer.from('Hello')
// console.log(buf_3)

let buf_4=Buffer.from([105,108,111,118,101,121,111,117]);
console.log(buf_4.toString());

let buf=Buffer.from('Hello');
console.log(buf[0].toString(2));
buf[0]=95;
console.log(buf.toString())


//中文(在utf-8编码规则中中文占三个字节故输出有6位16进制位)
let buf_5=Buffer.from('你好');
console.log(buf_5)
