import type { AxiosResponse, InternalAxiosRequestConfig } from "axios";

//针对AxiosRequestConfig配置进行扩展
export interface HYInterceptors<T=AxiosResponse>{
    requestSuccessFn?:(config:InternalAxiosRequestConfig)=> InternalAxiosRequestConfig
    requestFailureFn?:(err:any)=>any
    responseSuccessFn?:(res:T)=>T
    responseFailureFn?:(err:any)=>any
}

export interface HYRequestConfig<T= InternalAxiosRequestConfig> extends InternalAxiosRequestConfig{
    interceptors?: HYInterceptors<T>
}