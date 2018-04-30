import React,{Component} from 'react';
import {connect} from 'react-redux';
import actions from '../store/actions';
class Counter extends Component{
    render(){
        return (
            <div>
                <p>{this.props.number}</p>
                <button onClick={this.props.increment}>+</button>
                <button onClick={this.props.incrementAsync}>incrementAsync</button>
                <button onClick={this.props.incrementPromise}>incrementPromise</button>
                <button onClick={this.props.incrementPromise2}>incrementPromise2</button>
            </div>
        )
    }
}
export default connect(
    state=>state,
    actions
)(Counter);