import {INCREMENT,DECREMENT,CHANGE} from "./action-types";
//Actions must be plain objects. Use custom middleware for async actions.
export default {
    increment(){
        return {type:INCREMENT};
    },
    incrementAsync(){
        return function(dispatch,getState){
            setTimeout(function(){
               dispatch(new Promise(function(resolve,reject){
                    setTimeout(function(){
                        resolve({type:INCREMENT});
                    },1000)
               }));
            },1000)
        }
    },
    incrementPromise(){
        return new Promise(function(resolve,reject){
            setTimeout(function(){
                if(Math.random()>.5){
                    resolve({type:INCREMENT});
                }else{
                    reject({type:DECREMENT});
                }
            },1000);
        });
    },
    incrementPromise2(){
        //这个promise不管成功还是失败，都会再次派发action
        /*{type:CHNAGE,
        payload:1}
        {type:CHNAGE,
            payload:-1}*/
        return {
            type:CHANGE,
            payload:new Promise(function(resolve,reject){
                if(Math.random()>.5){
                    resolve(1);
                }else{
                    reject('出错了');
                }
            })
        }
    }
}