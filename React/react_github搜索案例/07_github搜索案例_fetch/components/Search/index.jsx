import React, { Component } from 'react'
import PubSub from 'pubsub-js';
// import axios from 'axios';

export default class Search extends Component {

    search=async()=>{
        const {keyWordElement}=this;
        PubSub.publish('search',{isFirst:false,isLoading:true});
        // axios.get(`/api1/search/users?q=${keyWordElement.value}`).then(
        //     response=>{
        //         PubSub.publish('search',{users:response.data.items,isLoading:false});
        //     },
        //     error=>{
        //         PubSub.publish('search',{err:error.message,isLoading:false});
        //     }
        // )

        //fetch（未优化）
        // fetch(`/api1/search/users?q=${keyWordElement.value}`).then(
        //     response=>{
        //         console.log('联系服务器成功');
        //         return response.json();
        //     },
        //     error=>{
        //         console.log('联系服务器失败',error);
        //         return new Promise(()=>{})
        //     }
        // ).then(
        //     response=>{console.log('获取数据成功了',response);},
        //     error=>{console.log('获取数据失败了',error);}
        // )

        //fetch(优化1.0)
          fetch(`/api1/search/users?q=${keyWordElement.value}`).then(
            response=>{
                console.log('联系服务器成功');
                return response.json();
            },
        ).then(
            response=>{console.log('获取数据成功了',response);},
        ).catcth(
            error=>{console.log('请求失败',error);}
        )
        try{
            const response=await fetch(`/api1/search/users?q=${keyWordElement.value}`);
            const data = await response.json();
            PubSub.publish('search',{users:data.items,isLoading:false});
            
        }catch(error){
            PubSub.publish('search',{err:error.message,isLoading:false});
        }

}
  render() {
    return (
        <section className="jumbotron">
        <h3 className="jumbotron-heading">Search Github Users</h3>
        <div>
          <input ref={c=>this.keyWordElement=c} type="text" placeholder="enter the name you search"/>&nbsp;
          <button onClick={this.search}>Search</button>
        </div>
      </section>
    )
  }
}
