
const curry=(fn)=>{
  let params=[];
  const next=(...args)=>{
    params=[...params,...args];
    if(params.length<fn.length){
      return next;
    }else{
      return fn.apply(fn,params);
    }
  }
  return next;
}

// 使用
const sum=(a, b, c, d)=>{
  return a + b + c + d;
}

const fn=curry(sum);
const res=fn(1)(2)(3)(4);
console.log(res);
