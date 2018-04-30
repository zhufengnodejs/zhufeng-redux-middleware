import {INCREMENT} from "./action-types";
//Actions must be plain objects. Use custom middleware for async actions.
export default {
    increment(){
        return {type:INCREMENT};
    },
    incrementAsync(){
        return function(dispatch,getState){
            setTimeout(function(){
               dispatch( {type:INCREMENT});
            },1000)
        }
    },
    incrementPromise(){
        return new Promise(function(resolve,reject){
            setTimeout(function(){
                resolve({type:INCREMENT});
            },1000);
        });
    }
}