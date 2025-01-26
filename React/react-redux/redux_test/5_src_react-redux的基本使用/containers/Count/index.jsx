import CountUI from "../../component/Count";

import { connect } from "react-redux";
import { createIncrementAction,
    createDecrementAction,
    createIncrementAsyncAction } 
    from "../../redux/count_action";



function mapStateToProps(state){
    return{count:state}
}

function mapDispatchToProps(dispatch){
    return {
    increment:num=>dispatch(createIncrementAction(num)),
    decrement:num=>dispatch(createDecrementAction(num)),
    incrementAsync:(num,time)=>dispatch(createIncrementAsyncAction(num,time)),
    }
}

//使用connect()()创建并暴露一个Count的容器组件
export default connect(mapStateToProps,mapDispatchToProps)(CountUI)