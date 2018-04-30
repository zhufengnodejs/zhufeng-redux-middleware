import {INCREMENT,DECREMENT,CHANGE} from "./action-types";

export default function(state={number:0,success:undefined,error:undefined},action){
   switch(action.type){
       case INCREMENT:
           return {number:state.number+1};
       case DECREMENT:
           return {number:state.number-1};
       case CHANGE:
           return {number:state.number+action.payload};
       default:
           return state;
   }
}