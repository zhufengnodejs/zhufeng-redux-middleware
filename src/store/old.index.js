import {createStore} from 'redux';
import reducer from './reducer';
//import logger from 'redux-logger';
//应用中间件,首先中间件的原理是对原生的仓库中的dispatch方法的增强或者修改
//getState获取仓库中的状态对象
//dispatch派发action方法
function logger({getState,dispatch}){//想获取状态和派发动作
  return function(next){//如果想继续，则可以调用next store.dispatch
    return function(action){
       console.log('before state',getState());
       console.log(action);
       next(action);
       console.log('after state',getState());
    }
  }
}
//thunk 是用来处理函数action的，判断一下如果这个action是一个函数的话，就会让他执行
function thunk({getState,dispatch}){
  return function(next){
      return function(action){
        if(typeof action == 'function'){
            action(dispatch,getState);
        }else{
            next(action);
        }
      }
  }
}
let promise = ({getState,dispatch})=>next=>action=>{
   if(action.then && typeof action.then =='function'){
        action.then(dispatch);
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

function applyMiddleware(middleware){
  return function (createStore) {
      return function(reducer){
        let store = createStore(reducer);//创建出原生的仓库 getState dispatch
        let dispatch;
        let middlewareAPI = {
            getState:store.getState,
            dispatch:action=>dispatch(action)
        };
        middleware= middleware(middlewareAPI);
        dispatch = middleware(store.dispatch);
        return {...store,dispatch}
      }
  }
}

//let store = createStore(reducer);
let store = applyMiddleware(promise)(createStore)(reducer);

export default store;