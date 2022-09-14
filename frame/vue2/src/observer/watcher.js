import {popTarget,pushTarget} from './dep';
import {queueWatcher} from './scheduler';
let id=0;
class Watcher{
  constructor(vm,exprOrFn,cb,options){
    this.vm=vm;
    this.exprOrFn=exprOrFn;
    this.user=!!options.user;
    this.cb=cb;
    this.options=options;
    this.id++;
    his.dirty = options.lazy; // 如果是计算属性，那么默认值lazy:true, dirty:true

    // 默认应该让exprOrFn执行  exprOrFn 方法做了什么是？ render （去vm上了取值）
    if (typeof exprOrFn == 'string') {
      this.getter = function() { // 需要将表达式转化成函数
          // 当我数据取值时 ， 会进行依赖收集
          // age.n  vm['age.n']  =》 vm['age']['n']
          let path = exprOrFn.split('.'); // [age,n]
          let obj = vm;
          for (let i = 0; i < path.length; i++) {
              obj = obj[path[i]]
          }
          return obj; // getter方法
      }
    } else {
        this.getter = exprOrFn; // updateComponent
    }
    
    this.deps=[];
    this.depsId=new Set();
    // 第一次的value
    this.value = this.lazy ? undefined : this.get(); // 默认初始化 要取值
  }

  get(){
    pushTarget(this);
    const value=this.getter.call(this.vm);
    popTarget();
  }

  update(){
    // queueWatcher(this);
    if(this.lazy){
      this.dirty = true;
    }else{
        queueWatcher(this); // 多次调用update 我希望先将watcher缓存下来，等一会一起更新
    }
  }

  run(){
    const newVal=this.get();
    const oldVal=this.value;
    this.value=newVal;
    if(this.user){
      this.cb.call(this.vm,newVal,oldVal);
    }
  }

  addDep(dep){
    let id=dep.id;
    if(!this.depsId.has(id)){     //dep为什么要去重？？一个属性会对应多个watcher，一个watcher也会对应多个属性 这就是去重的必要性
      this.depsId.add(id);
      this.deps.push(dep);
      dep.addSub(this);
    }
  }
  evaluate(){
    this.dirty = false; // 为false表示取过值了
    this.value = this.get(); // 用户的getter执行
  }
  depend(){
      let i = this.deps.length;
      while(i--){
          this.deps[i].depend(); //lastName,firstName 收集渲染watcher
      }
  }
}

export default Watcher;

