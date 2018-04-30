import {INCREMENT} from "./action-types";
//Actions must be plain objects. Use custom middleware for async actions.
export default {
    increment(){
        return {type:INCREMENT};
    },
    incrementAsync(){
        return function(getState,dispatch){
            setTimeout(function(){
               dispatch( {type:INCREMENT});
            },1000)
        }
    }
}