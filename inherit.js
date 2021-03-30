class Super{
  constructor(){
    this.name='lll';
  }
  static getAge(){
    return 35;
  }
}
class Sub extends Super{
  constructor(options){
    super();
    this.name=options.name;
  }
}
const sub=new Sub({name:'hhl'});
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
  Object.setPrototypeOf(son,father.prototype);
}
inheritPrototype(sonFn, fatherFn)
sonFn.prototype.sonFnSome = '子类原型对象的属性或者方法'
const sonFnInstance = new sonFn();
console.log('寄生组合式继承子类实例', sonFnInstance)
