import {createStore,applyMiddleware,compose} from 'redux';
import reducer from './reducer';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import promise from 'redux-promise';
//thunk 是用来处理函数action的，判断一下如果这个action是一个函数的话，就会让他执行
function thunk1({getState,dispatch}){
    return function(next){//next指向的是下一个中间件或者dispatch
        return function(action){
            if(typeof action == 'function'){
                action(dispatch,getState);
            }else{
                next(action);
            }
        }
    }
}
let promise1 = ({getState,dispatch})=>next=>action=>{
    if(action.then && typeof action.then =='function'){
        action.then(dispatch);//因为dispatch就等于action=>dispatch(action);
    }else if(action.payload&&action.payload.then&&typeof action.payload.then=='function'){
        action.payload.then(function(payload){
            dispatch({...action,payload});
        },function(payload){
            dispatch({...action,payload});
        });
    }else{
        next(action);
    }
}
//logger 中间件最后放在最右边，因为越靠右意味着越晚执行，越靠近store.dispatch
function logger1({getState,dispatch}){//想获取状态和派发动作
    return function(next){//如果想继续，则可以调用next store.dispatch
        return function(action){
            console.log('before state',getState());
            console.log(action);
            next(action);
            console.log('after state',getState());
        }
    }
}
//函数化编程 纯函数
let compose1 = (...fns)=>  fns.reduce((a,b)=>(...args)=>a(b(...args)));

let applyMiddleware1 = (...middlewares)=>createStore=>reducer=>{
    let store = createStore(reducer);
    let dispatch;
    let middlewareAPI = {
        getState:store.getState,
        //此处不要简化为dispatch，因为我们希望让middlewareAPI.dispatch调用到增加后的dispatch
        dispatch:action=>dispatch(action)
    }
    //[thunk,promise,logger]
    middlewares = middlewares.map(middleware=>middleware(middlewareAPI));
    //把多个中间件组合成一个函数，接收一个参数，并获取一个返回值
    dispatch =compose(...middlewares)(store.dispatch);
    return {...store,dispatch}
}
function createStore(reducer,enhancer){
   if(typeof enhancer == 'function'){
     return enhancer(createStore)(reducer);
   }
}
//let store = applyMiddleware(thunk,promise,logger)(createStore)(reducer);
let store = createStore(reducer,applyMiddleware(thunk,promise,logger));
export default store;