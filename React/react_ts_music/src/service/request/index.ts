import axios from 'axios'
import type { AxiosInstance } from 'axios'
import type { HYRequestConfig } from './type'


class HYRequest{
    instance:AxiosInstance

    //request实例=>axios的实例
    constructor(config:HYRequestConfig){
        this.instance =axios.create(config)

        //每个instance实例都添加拦截器
        this.instance.interceptors.request.use(
            (config)=>{

                return config
            },
            (err)=>{
                return err
            }
        )
        this.instance.interceptors.response.use(
            (res)=>{
                return res.data
            },
            (err)=>{
                return err
            }
        )

        //针对特定的hyRequest实例添加拦截器
        this.instance.interceptors.request.use(
           config.interceptors?.requestSuccessFn,
            config.interceptors?.requestFailureFn
        )
        this.instance.interceptors.response.use(
            config.interceptors?.responseFailureFn,
            config.interceptors?.responseFailureFn
        )
    }
    //封装网络请求的方法
    //T=>IHOMEData
    request<T=any>(config:HYRequestConfig<T>){
        //单次请求的成功拦截处理
        if(config.interceptors?.requestSuccessFn){
            config=config.interceptors.requestSuccessFn(config)
        }

        //返回Promise
        return new Promise<T>((resolve,reject)=>{
            this.instance
            .request<any,T>(config)
            .then((res)=>{
                //单次响应的成功拦截处理
                if(config.interceptors?.responseSuccessFn){
                    res=config.interceptors.responseSuccessFn(res)
                }
                resolve(res)
            })
            .catch((err)=>{
                reject(err)
            })
        })
        }

        get<T=any>(config:HYRequestConfig<T>){
            return this.request({...config,method:'GET'})
        }
        post<T=any>(config:HYRequestConfig<T>){
            return this.request({...config,method:'POST'})
        }
        delete<T=any>(config:HYRequestConfig<T>){
            return this.request({...config,method:'DELETE'})
        }
        patch<T=any>(config:HYRequestConfig<T>){
            return this.request({...config,method:'PATCH'})
        }
 
}