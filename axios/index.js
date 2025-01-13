
const axios =require('axios');

//向给定ID的用户发送请求
axios.get('/user?ID=12345').then(function(response){
    //处理成功的情况
    console.log(response);
})
.catch(function(error){
    //处理错误的情况
    console.log(error);
})
.finally(function(){
    //总会执行
});

axios.get('/user',{
    params:{
        ID:12345
    }
}).then(function(response){
    console.log(response);
})
.catch(function(error){
    console.log(error);
})
.finally(function(){

});

//支持async和await用法
async function getUser() {
    try{
        const response =await axios.get('/user?ID=12345');
        console.log(response);
    }
    catch(error){
        console.log(error);
    }
    
}

axios.post('/user',{
    firstName:'Jet',
    lastName:'Chet'
})
.then(function(response){
    console.log(response);
})
.catch(function(error){
    console.log(error);
})


//定义异步函数通过get请求向指定的URL发送HTTP请求，并返回一个Promise
function getUserAccount(){
    return axios.get('/user/12345');
}
function getUserPermission(){
    return axios.get('/user/12345/permission');
}

//使用解构赋值当所有Promise都fulfil时，返回数组。await等待所有Promise完成，暂停执行，直到结果返回。
const[acct,perm]=await Promise.all([getUserAccount(),getUserPermission]);
//或使用.then的方法
Promise.all([getUserAccount(),getUserPermission()])
.then(function([acct,perm]){
    //...
});

const{data}=await axios.post('/user',document.querySelector('#my-form'),
{
    headers:{
        'Content-Type':'application/json'
    }
})

//发起一个POST请求
axios({
    method:'post',
    url:'/user/12345',
    data:{
        firstName:'Jet',
        lastName:'Chet'
    }
});

//在node.js用GET请求获取远程图片
axios({
    method:'get',
    url:'http://bit.ly/2mTM3nY',
    responseType:'stream'
})
.then(function(response){
    response.data.pipe(fs.createWriteStream('ada_lovelace.jpg'))
});

//发起一个GET请求（默认请求方式）
axios('/user/12345');

const instance =axios.create({
    baseURL:'https://some-domain.com/api/',
    timeout:1000,
    headers:{'X-Custom-Header':'footbar'}
}); 


{

    //`data`由服务器提供的响应
    data:{},

    //`status`来自服务器我响应的HTTP状态码
    status:200,

    //`statusText`来自服务器响应的HTTP状态信息
    statusText:'OK',

    //`headers`是服务器响应头
    //所有的header名称都是小写，而且可以使用方括号语法访问
    //例如：`response.headers['content-type']`
    headers:{},

    //`config`是`axios`请求的配置信息
    config:{},

    //`request`是生成此响应的请求体
    //在node.js中它是最后一个ClientRequest实例(in redirects).
    //在浏览器中则是XMLHttpRequest实例
    request:{}
}

axios.get('/user/12345')
.then(function(response){
    console.log(response.data);
    console.log(response.status);
    console.log(response.statusText);
    console.log(response.headers);;
    console.log(response).config;
});

axios.defaults.baseURL='https://api.example.com';
axios.defaults.headers.common['Authorization']=AUTH_TOKEN;
axios.defaults.headers.post['Content-Type']='application/x-www-form-urlencoded';


//创建实例时配置默认值
const instance =axios.create({
    baseURL:'https://api.example.com'
});

//创建实例后修改默认值
instance.defaults.headers.common['Authorization']=AUTH_TOKEN;



//使用库提供的默认配置创建实例
//此时超时配置的默认值是`0`
const instance = axios.create();

//重写库的超时默认值
//现在，所有使用此实例的请求都将等待2.5秒，然后才会超时
instance.defaults.timeout=2500;

//重写此请求的超时时间，因为该请求需要很长时间
instance.get('/longRequest',{
    timeout:5000
})