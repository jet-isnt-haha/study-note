import { configureStore } from "@reduxjs/toolkit";
import btnReducer from "./modules/button";
import userReducer from "./modules/user";

const store =configureStore({
    reducer:{
        btn:btnReducer,
        user:userReducer,
    }
})

export default store