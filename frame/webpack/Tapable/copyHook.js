module.exports= class SyncHook{
  constructor(args){
    this.tasks=[];
  }
  tap(name,cb){
    this.tasks.push(cb);
  }
  // args是数据  ...相当于解构
  call(...args){
    this.tasks.forEach(task=>task(...args));
  }
}

// Bail
module .exports=class SyncBailHook{
  constructor(args){
    this.tasks=[];
  }
  call(...args){
    let ret,index=0;
    // 先执行一次
    do{
      ret=this.tasks[index++](...args);
    }while(ret===undefined && index<this.tasks.length)
  }
  tap(name,cb){
    this.tasks.push(cb);
  }
}

// Waterfall
module.exports=class SyncWaterfallHook{
  constructor(args){
    this.tasks=[];
  }
  tap(name,cb){
    this.tasks.push(cb);
  }
  call(...args){
    // let task=this.tasks.unshift()(...args);
    const [first,...others]=this.tasks;
    let ret=first(...args);
    // 第一个函数的结果值会作为下面函数的参数值
    this.tasks.reduce((a,b)=>{
      return b(a);
    },ret);
  }
}

// Loop
module.exports=class SyncLoopHook{
  constructor(args){
    this.tasks=[];
  }
  tap(name,cb){
    this.tasks.push(cb);
  }
  call(...args){
    // 某个钩子函数会循环执行，循环的条件是结果值不是undefined
    this.tasks.forEach(task=>{
      let ret;
      do{
        ret=task(...args);
      }while(ret!==undefined)
    })
  }
}
// 并行---forEach Parallel
module.exports = class AsyncParallelHook{
  constructor(args){
    this.tasks=[];
  }
  tapAsync(name,cb){
    this.tasks.push(cb);
  }
  // 异步并行，通过计数控制
  callAsync(...args){
    let cb=args.pop();
    let count=0;
    const done=()=>{
      ++count;
      if(count===this.tasks.length) return cb();
    }
    this.tasks.forEach(task=>{
      task(...args,done);
    })
  }
}

// 串行--异步迭代需要一个中间函数 Series
module.exports=class AsyncSeries{
  constructor(args){
    this.tasks=[];
  }
  tapAsync(name,cb){
    this.tasks.push(cb);
  }
  callAsync(...args){
    let index=0;
    const endCb=args.pop();
    const next=()=>{
      if(index===this.tasks.length) return endCb();
      const task=this.tasks[index++];
      task(...args,next);
    }
    next();
  }
  // promise串行：第一个promise执行完毕下一个promise继续执行。reduce迭代
  promise(...args){
    let [first,...others]=this.tasks;
    return others.reduce((a,b)=>{
      return a.then(()=>b(...args));
    },first(...args));
  }
}
// 串行传参：第一个函数执行的结果为第二个函数的参数 SeriesWaterfall
module.exports=class AsyncSeriesWaterfallHook{
  constructor(args){
    this.tasks=[];
  }
  tapAsync(name,cb){
    this.tasks.push(cb);
  }
  callAsync(...args){
    let index=0;
    let finalCb=args.pop();
    const next=(err,data)=>{
      if(index===this.tasks.length) return finalCb();
      const task=this.tasks[index];
      if(index===0){
        task(...args,next)
      }else{
        task(data,next);
      }
      ++index;
    }
    next();
  }
}

