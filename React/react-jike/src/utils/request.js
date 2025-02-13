//axios的封装处理

//1.根域名配置
//2.超时时间
//3.请求拦截器/响应拦截器

import axios from "axios";
import { getToken, removeToken } from "./token";
import router from "@/router";

const request=axios.create({
    baseURL:"http://geek.itheima.net/v1_0",
    timeout:5000
})

//添加请求拦截器
//在请求发送之前 做拦截 插入一些自定义的配置[参数的处理]

request.interceptors.request.use((config)=>{
    const token =getToken()
    if(token){
        config.headers.Authorization=`Bearer ${token}`
    }
    return config
},(error)=>{
    return Promise.reject(error)
})


//添加响应拦截器
//在响应返回客户端之前 做拦截 重点处理返回的数据
request.interceptors.response.use((response)=>{
    return response
},(error)=>{
    if(error.response.status===401){
        removeToken();
        router.navigate('/login').then(
            ()=>{
                window.location.reload();
            }
        )
    }
    return Promise.reject(error)
})


export {request}