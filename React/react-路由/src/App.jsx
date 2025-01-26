import React from 'react'
import { NavLink,useRoutes } from 'react-router-dom'

import routes from './routes';

export default function App() {
    function computedClassName({isActive}){
        return isActive?'list-group-item jet':'list-group-item';
    }
    const element =useRoutes(routes);
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
                        {element}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
