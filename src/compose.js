//compose把很多函数组合在一起
function addA(str){
    return str + 'A';
}
function addB(str){
    return str + 'B';
}
function addC(str){
    return str + 'C';
}
//let r = addC(addB(addA('hello')));
//console.log(r);//helloABC

function compose1(...fns){
  if(fns.length==0){
      return (args)=>args;
  }else if(fns.length == 1){
      return (...args)=>fns[0](...args);
  }else{
      let last = fns.pop();
      return function(...args){
        let result = last(...args);//helloA
        //1  val=helloA   item=addB =>helloAB
        //2  val=helloAB  item=addC =>helloABC
        return fns.reduceRight((val,item)=>{
            return item(val);//helloAB
        },result);//helloA
      }
  }
}

let compose = (...fns)=>  fns.reduce((a,b)=>(...args)=>a(b(...args)));
/**
 * 第一次执行 a=addC b= addB  =>  函数 参数先传给b,b执行结果再传给a,再把a的结果返回
 *   args=>addC(addB(args));
 * 第二次执行 a=args=>addC(addB(args));  b=addA =>  xx=>addC(addB(addA(xx))
 *
 */

//把多个函数组合成一个函数
let composed = compose(addC,addB,addA);
let r = composed('hello');
console.log(r);//helloABC