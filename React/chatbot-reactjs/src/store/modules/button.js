//发送按钮状态管理

import { createSlice } from "@reduxjs/toolkit";


const btnStore=createSlice({
    name:"btn",
    initialState:{
        pause:false,
    },
    reducers:{
    setPause(state,action){
        state.pause=action.payload
    } 
    }
})

const {setPause}=btnStore.actions

const btnReducer =btnStore.reducer

export {setPause}

export default btnReducer