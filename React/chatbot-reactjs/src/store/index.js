import { configureStore } from "@reduxjs/toolkit";
import btnReducer from "./modules/button";

const store =configureStore({
    reducer:{
        btn:btnReducer
    }
})

export default store