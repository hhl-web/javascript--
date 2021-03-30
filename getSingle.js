// 创建单例对象,使用闭包
const getSingle=function(fn){
  let result;
  return function(){
    return result||(result=fn.apply(this,arguments))
  }
}
// 使用Proxy拦截
const proxy=function(fn){
  let result;
  const handler={
    construct:function(){
      if(!result){
        result=Reflect.construct(fn,arguments);
      }
      return result;
    }
  }
  return new Proxy(fn,handler);
}

// Reflect.construct方法等同于new target(...args)，这提供了一种不使用new，来调用构造函数的方法。