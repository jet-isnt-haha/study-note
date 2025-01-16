import React, { Component } from 'react'
import Search from './components/Search'
import List from './components/List'
export default class App extends Component {
  state={users:[],
    isFirst:true,
    isLoading:false,
    err:'',
  }//初始化状态

updateAppState=(stateObj)=>{
  this.setState(stateObj);
}


  render() {
    return (
      <div className="container">
        <Search updateAppState={this.updateAppState}/>{/*父组件给子组件传函数*/}
        <List {...this.state}/>
    </div>
    )
  }
}
