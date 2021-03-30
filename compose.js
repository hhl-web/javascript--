// compose从里到外执行函数
function compose(fns){
  return function(...args){
    let start=fns.length-1;
    let result=[...args];
    while(start>=0){
      result=fns[start].apply(fns[start],result);
      start--;
    }
    return result;
  }
}


function compose(fns){
  return fns.reduce((a,b)=>(...args)=>a(b(...args)));
}

const a=()=>{return 1};
const b=(data)=>{return data};
const result=compose([a,b])();
console.log(result);