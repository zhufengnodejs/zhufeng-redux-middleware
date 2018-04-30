let fn= function(){
    console.log('a');
}
let obj = {
    fn:()=>fn()
}
fn = function(){
    console.log('b');
}

obj.fn();