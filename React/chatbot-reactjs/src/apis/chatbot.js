import { http } from "../utils";

//模型回复API
export function generateAPI(history,signal){
    return http({
        url:'/generate',
        method:'POST',
        data:{
            history
        },
        signal
    })
}

//存储MessageAPI
export function upSertMessageAPI(data){
    return http({
        url:'/message/upsert',
        method:'POST',
        data
    })
}