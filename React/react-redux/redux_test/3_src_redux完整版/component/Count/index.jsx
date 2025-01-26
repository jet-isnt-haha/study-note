import React, { Component } from 'react'
import store from '../../redux/store'
import { createIncrementAction, createDecrementAction } from '../../redux/count_action'
export default class Count extends Component {
  state = {
    //...（可以防止除去共享外的其他状态）
  }

  increment = () => {
    const { value } = this.numberSelect;
    store.dispatch(createIncrementAction(value * 1));
  }

  decrement = () => {
    const { value } = this.numberSelect;
    store.dispatch(createDecrementAction(value * 1));
  }

  incrementIfOdd = () => {
    const { value } = this.numberSelect;
    const count = store.getState();
    if (count % 2 !== 0) {
      store.dispatch(createIncrementAction(value * 1));
    }
  }

  incrementAsync = () => {
    const { value } = this.numberSelect
    setTimeout(() => {
      store.dispatch(createIncrementAction(value * 1));
    }, 500);
  }
  // componentDidMount(){
  //     store.subscribe(()=>{
  //         this.setState({})
  //     })
  // }
  render() {
    return (
      <div>
        <h1>计算求和为{store.getState()}</h1>
        <select ref={c => this.numberSelect = c} >
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
        </select>&nbsp;
        <button onClick={this.increment}>+</button>&nbsp;
        <button onClick={this.decrement}>-</button>&nbsp;
        <button onClick={this.incrementIfOdd}>奇数再加</button>&nbsp;
        <button onClick={this.incrementAsync}>异步加</button>
      </div>
    )
  }
}
