
import { connect } from "react-redux";
import { createIncrementAction,
    createDecrementAction,
    createIncrementAsyncAction } 
    from "../../redux/count_action";




    import React, { Component } from 'react'
    class Count extends Component {
      state = {
        //...（可以防止除去共享外的其他状态）
      }
    
      increment = () => {
        const { value } = this.numberSelect;
        this.props.increment(value*1)
      }
    
      decrement = () => {
        const { value } = this.numberSelect;
        this.props.decrement(value*1);
      }
    
      incrementIfOdd = () => {
        const { value } = this.numberSelect;
        if(this.props.count%2!==0)
        this.props.increment(value*1)
      }
    
      incrementAsync = () => {
        const { value } = this.numberSelect
        this.props.incrementAsync(value*1,500)
      }
      render() {
        return (
          <div>
            <h1>计算求和为{this.props.count}</h1>
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
    
// function mapStateToProps(state){
//     return{count:state}
// }

// function mapDispatchToProps(dispatch){
//     return {
//     increment:num=>dispatch(createIncrementAction(num)),
//     decrement:num=>dispatch(createDecrementAction(num)),
//     incrementAsync:(num,time)=>dispatch(createIncrementAsyncAction(num,time)),
//     }
// }

//使用connect()()创建并暴露一个Count的容器组件
export default connect(
    //映射状态
    state=>({count:state}),
    //mapDispatchToProps的简写形式

    //映射操作状态的方法
{
        increment:createIncrementAction,
        decrement:createDecrementAction,
        incrementAsync:createIncrementAsyncAction, 
})(Count)