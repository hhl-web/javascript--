const _instanceof=function(left,right){
  if(!left &&  !right) return;
  const rightPrototype=right.prototype;
  console.log(rightPrototype)
  while(left=Object.getPrototypeOf(left)){
    if(left===rightPrototype) return true;
  }
  return false;
}

const obj={a:1}
console.log(_instanceof(obj,Object));