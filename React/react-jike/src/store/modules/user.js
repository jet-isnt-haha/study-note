//和用户相关的状态管理

import { createSlice } from "@reduxjs/toolkit";
import { removeToken } from "@/utils";
import { setToken as _setToken,getToken } from "@/utils";
import { loginAPI,getProfileAPI } from "@/apis/user";
const userStore=createSlice({
    name:"user",
    initialState:{
        token:getToken()||'',
        userInfo:{}
    },
    reducers:{
        setToken(state,action){
            state.token=action.payload
            _setToken(state.token)
        },
        setUserInfo(state,action){
            state.userInfo=action.payload
        },
        clearUserInfo(state){
            state.token=''
            state.userInfo={}
            removeToken()
        }
    }
})

const{setToken,setUserInfo,clearUserInfo}=userStore.actions
 
const userReducer=userStore.reducer

const fetchLogin=(loginForm)=>{
    return async(dispatch)=>{
        const res =await loginAPI(loginForm)
        dispatch(setToken(res.data.data.token))
    }
}
const fetchUserInfo=()=>{
    return async(dispatch)=>{
        const res =await getProfileAPI();
        dispatch(setUserInfo(res.data.data))
    }
}
export {setToken,fetchLogin,fetchUserInfo,clearUserInfo}

export default userReducer
