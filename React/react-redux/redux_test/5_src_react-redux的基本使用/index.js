import React from "react";
import { createRoot } from "react-dom/client";

import App from './App.jsx'
import store from "./redux/store.js";

const  root =createRoot(document.getElementById('root'));
root.render(<App/>);
store.subscribe(()=>{
    root.render(<App/>);

}) 