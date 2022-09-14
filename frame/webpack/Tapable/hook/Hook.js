class Hook{
  constructor(args){
    if(!Array.isArray(args)) this._args=[];
    this._args=args;
    this.taps=[];
    this._x=undefined;
  }

  tap(name,fn){
    const options=Object.assign({},{name:name,callback:fn});
    this._insert(options);
  }
  // 添加每一个tap
  _insert(options){
    this.taps.push(options);
    // this._x=this.taps.map(tap=>tap.callback);
  }

  // 执行
  call(...args){
    const callMethod=this._createCall();
    return callMethod.apply(this,args)
  }
  _createCall(){
    return this.compile({
      args:this._args,
      taps:this.taps,
    })
  }
}

// 为什么 _x真正存放要执行的函数不在Hook这个类直接生成，而是要绕路走了一圈在HookCodeFactory这个类生成呢？
/**
 * 不同的hook实例都会继承与父类Hook的_x属性，
 * 那么不同的hook身上都有了_x属性，那么值的来源是实例自己，要不重写属性值，要不就是使用父类的属性值。
 * 而将_x放在HookCodeFactory这个类去生成的好处在于每个实例都有有自己独立要执行的fn。
 */

//  这里的call是动态生成的。每个hook所生成的是不一致的。但每一个hook都是模板编译来的。