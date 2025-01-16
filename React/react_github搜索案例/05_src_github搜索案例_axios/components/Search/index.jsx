import React, { Component } from 'react'
import axios from 'axios';

export default class Search extends Component {

    search=()=>{
        const {keyWordElement}=this;
        this.props.updateAppState({isFirst:false,isLoading:true});
        axios.get(`/api1/search/users?q=${keyWordElement.value}`).then(
            response=>{
                this.props.updateAppState({users:response.data.items,isLoading:false});
            },
            error=>{
                this.props.updateAppState({err:error.message,isLoading:false});
            }
        )

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
