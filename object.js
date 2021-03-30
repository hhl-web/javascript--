Object.prototype._create=function(object){
  function F(){}
  F.prototype=object;
  return new F();
}

//修改原对象的属性 会影响新对象的原型
var obj1 = { p: 1 };
var obj2 = Object.create(obj1); //浅拷贝

obj1.p = 2;
console.log('obj', obj1, obj2);