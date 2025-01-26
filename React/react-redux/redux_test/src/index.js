import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";

import App from './App.jsx'
import store from "./redux/store";

const  root =createRoot(document.getElementById('root'));
root.render(
    /* 此处需要用Provider包裹App，目的是让App所有的后代容器组件都能接收到store */
<Provider store={store} >
    <App/>
    </Provider>
);
