import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";

import App from './App.js'
import store from "./redux/store.js";

const  root =createRoot(document.getElementById('root'));
root.render(<Provider store={store} ><App/></Provider>);
