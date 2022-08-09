/* 
 *隐式改变this指向
 call内部的 this指向 =》执行call函数的函数。目标是要改变该函数的内部this指向~
 context对象的某个属性引用 调用函数 再执行context对象某个属性。
 */
Function.prototype.myCall=function(...args){
  let [context,...other]=args;
  if(context === null || context === undefined){
    context=window;
  }else{
    context=Object(context);
  }
  const _symbol=Symbol('特殊属性symbol');
  context[_symbol]=this;
  const res=context[_symbol](...other);
  delete context[_symbol];
  return res;
}

function isArrayLike(o) {
  if (o &&                                    // o不是null、undefined等
      typeof o === 'object' &&                // o是对象
      isFinite(o.length) &&                   // o.length是有限数值
      o.length >= 0 &&                        // o.length为非负值
      o.length === Math.floor(o.length) &&    // o.length是整数
      o.length < 4294967296                   // o.length < 2^32
    ){
      return true;
    }else{
      return false
    }                  
}
Function.prototype.myApply=function(...args){
  let [context,...other]=args;
  if(context === null || context === undefined){
    context=window;
  }else{
    context=Object(context);
  }
  const _symbol=Symbol('特殊属性');
  context[_symbol]=this;
  let res;
  if(other){
    if(!Array.isArray(other) && !isArrayLike(other)){
      throw new Error('第二个参数不为数组并且不为类数组对象抛出错误')
    }else{
      res=context[_symbol](...Array.from(other));
    }
  }else{
    res=context[_symbol]();
  }
  delete context[_symbol];
  return res;
}
/**
 * 返回一个新的函数
 */
Function.prototype.myBind=function(...args){
  let [context,...other]=args;
  const findFn=(...params)=>{
    context=new.target ? this:Object(context);
    return this.call(context,...args,...params);
  }
  if(this.prototype) findFn.prototype=this.prototype;
  return findFn;
}