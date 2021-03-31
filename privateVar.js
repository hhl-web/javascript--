function Calculate() {
  let data = new WeakMap();
  Calculate = function () {
    data.set(this,Math.random());
  };
  // 方法挂在原型上,其实例共享
  Calculate.prototype.doSth = function () {
    return data.get(this);

  };
  return  new Calculate();
}

let c1 = new Calculate();
let c2 = new Calculate();
console.log(c1.doSth());
console.log(c2.doSth());
console.log(c1.doSth());



// es5
function A() {
  var a = Math.random();
  A.prototype.getA = () => a;  //挂在原型身上，每个实例共享
  this.getA = () => a;    //挂在实例自己身上
}

// 如果挂在在原型上的话，那么随机数a1的值第一次输出和第二次输出是发生变化的。如果定义成自己方法那么是不一致的。
var a1 = new A();
console.log(a1.getA());
var a2 = new A();
console.log(a2.getA());
console.log(a1.getA());