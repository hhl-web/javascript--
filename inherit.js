class Super{
  constructor(){
    this.name='lll';
    this._x=null;
  }
  static getAge(){
    return 35;
  }
}
class Sub extends Super{
  constructor(options){
    super();
    this.name=options.name;
    // this._x='实例自己的值';  //如果子类的_x属性有值那么就不会继承父类的_x，相当于会重写父类的值。
  }
}
const sub=new Sub({name:'hhl'});
const sup=new Super();
console.log(sub,sup);
console.log(Sub.getAge);


function fatherFn(...arr) {
  this.some = '父类的this属性';
  this.params = arr // 父类的参数
}
fatherFn.prototype.fatherFnSome = '父类原型对象的属性或者方法';
function sonFn() {
  this.obkoro1 = '子类的this属性';
}
function inheritPrototype(son, father) {
  const fatherFnPrototype = Object.create(father.prototype); 
  son.prototype = fatherFnPrototype; // 设置father.prototype为son.prototype的原型
  son.prototype.constructor = son; // 修正constructor 指向
  Object.setPrototypeOf(son,father);
}
inheritPrototype(sonFn, fatherFn)
sonFn.prototype.sonFnSome = '子类原型对象的属性或者方法'
const sonFnInstance = new sonFn();
console.log('寄生组合式继承子类实例', sonFnInstance)
