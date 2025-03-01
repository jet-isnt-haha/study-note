//发送按钮状态管理

import { createSlice } from "@reduxjs/toolkit";


const btnStore=createSlice({
    name:"btn",
    initialState:{
        pause:false,
        showChatbot:false
    },
    reducers:{
    setPause(state,action){
        state.pause=action.payload
    } ,
    setShowChatbot(state,action){
        state.showChatbot=action.payload
    }
    }
})

const {setPause,setShowChatbot}=btnStore.actions

const btnReducer =btnStore.reducer

export {setPause,setShowChatbot}

export default btnReducer