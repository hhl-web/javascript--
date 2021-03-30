
const type=(function(){
  const type=Object.create(null);
  const typeAry=['String','Number','Object','Array','Null','Undefined','Boolean'];
  for(let i=0;i<typeAry.length;i++){
    type[`is${typeAry[i]}`]=function(args){
      return Object.prototype.toString.call(args)==='[object'+' '+typeAry[i]+']';
    }
  }
  return type;
}())
// 使用
console.log(type.isArray({a:1,length:1}));
console.log(type.isString(12));