//引入react核心库
import React from 'react'



//引入App
import App from './App.jsx'

//引入ReactDOM
import { createRoot } from 'react-dom/client'

const root =createRoot(document.getElementById('root'))
root.render(<App/>)