let oldArrayProperty=Array.prototype;
let newArrayProperty=Object.create(oldArrayProperty);


let methods=['push','pop','splice','shift','unshift','reverse','sort'];


// 将数组的方法进行重写
methods.forEach(method=>{

  // 剩余参数args是数组
  newArrayProperty[method]=function(...args){
    oldArrayProperty[methods].call(this,...args); //调用老原型链的方法
    let inserted;
    let ob=this.__ob__;
    switch(method){
      
      case 'push':
      case 'unshift':
        inserted=args;
        break;
      case 'splice':
        inserted =args.slice(2);
      default:
        break;
    }
    if(inserted) ob.observeArray(inserted);  //观测新值
    ob.notify();
  }
})

export newArrayProperty;
