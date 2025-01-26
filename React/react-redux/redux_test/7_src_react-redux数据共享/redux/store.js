/* 该文件专门用于暴露一个store对象，整个应用只有一个store对象 */

//引入createStore，专门用于创建redux中最为核心的store对象
import {legacy_createStore as createStore,applyMiddleware,combineReducers } from "redux";

import { thunk } from "redux-thunk";

//引入Count组件服务的reducer
import countReducer from './reducers/count'
//引入Person组件服务的reducer
import  personReducer  from "./reducers/person";

const allReducer = combineReducers({count:countReducer,persons:personReducer})

//暴露store
export default createStore(allReducer,applyMiddleware(thunk))