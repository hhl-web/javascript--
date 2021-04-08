

/**
 * 
 * @param {*} left 
 * @param {*} right 
 * Object.prototype 和 Object.getPrototypeOf输出的结果是不一致的
 * Object.getPrototypeOf() 方法返回指定对象的原型（内部[[Prototype]]属性的值）。
 * Object.prototype 属性表示 Object 的原型对象。
 */
const _instanceof=function(left,right){
  if(!left &&  !right) return;
  const rightPrototype=right.prototype;
  while(left=Object.getPrototypeOf(left)){
    if(left===rightPrototype) return true;
  }
  return false;
}

const obj={a:1}
console.log(_instanceof(obj,Object));