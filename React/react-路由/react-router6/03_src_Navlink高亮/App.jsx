import React from 'react'
import { NavLink,Route,Routes,Navigate } from 'react-router-dom'

import Home from './pages/Home'
import About from './pages/About'

export default function App() {
    function computedClassName({isActive}){
        return isActive?'list-group-item jet':'list-group-item';
    }
    return (
        <div>
            <div className="row">
                <div className="col-xs-offset-2 col-xs-8">
                    <div className="page-header"><h2>React Router Demo</h2></div>
                </div>
            </div>
            <div className="row">
                <div className="col-xs-2 col-xs-offset-2">
                    <div className="list-group">
                        {/* 原生html中，靠<a></a>跳转不同的页面 */}
                        {/* <a className="list-group-item active" href="./about.html">About</a>
          <a className="list-group-item" href="./home.html">Home</a> */}


                        {/* 在React中靠路由链接实现切换组件--编写路由链接 */}
             {/*            <Link className="list-group-item" to="/about">Home</Link>
                        <Link className="list-group-item" to="home">About</Link> */}
                        <NavLink className={computedClassName} to="/about">About</NavLink>
                        <NavLink className={computedClassName} to="/home">Home</NavLink>
                    </div>
                </div>
                <div className="col-xs-6">
                    <div className="panel">
                        <div className="panel-body">
                                {/* 注册路由 */}
                                <Routes>
                                <Route path='/about' element={<About />} />
                                <Route path='/home' element={<Home />} />
                                <Route path='/' element={<Navigate to="/about"/>} />
                                </Routes>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
