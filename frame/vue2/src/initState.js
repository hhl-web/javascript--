import {isFunction} from './utils/index.js';
import observe from './observer/index.js'
import Watcher from './observer/watcher.js';
import Dep from './observer/dep.js';

// $watch 实际上是watch实现的
export function stateMixin(Vue){
  Vue.$watch=function(key,handler,options={}){
    options.user=true;
    new Watcher(this,key,handler,options);
  }
}


export function initState(vm){
  // 初始化
  const opts=vm.$options;
  if(opts.data){
    initData(vm);
  }
  if(opts.computed){
    initComputed(vm,opts.computed)
  }
  if(opts.watch){
    initWatch(vm,opts.watch);
  }
}

function proxy(vm,sourceKey,key){
  Object.defineProperty(vm,key,{
    get(){
      return vm[sourceKey][key];
    }

    set(val){
      vm[sourceKey][key]=val;
    }
  })
}

function initData(vm){
  let data=vm.$options.data;
  // 通过_data将data数据和vm实例进行关联
  data=vm._data=isFunction(data) ? data.call(vm):data;


  for(let key in data){
    proxy(vm,'_data',key);
  }

  observe(data);
};

function initComputed(vm,computed){
  const watchers=vm._computedWatchers={};
  for(let key in computed){
    const userDef =computed[key];
    let getter=typeof userDef === 'function' ? userDef:userDef.get;
    // 每个计算属性实际上是一个watcher
    watchers[key]=new Watcher(vm,getter,()=>{},{lazy:true});//默认不执行
    // 将key定义在vm上
    defineComputed(vm,key,userDef);
  }
};

function defineComputed(vm,key,userDef){
  let sharedProperty = {};
  if(typeof userDef == 'function'){
    sharedProperty.get=userDef;
  }else{
    sharedProperty.get=createComputedGetter(key);
    sharedProperty.set=userDef.set;
  }
  Object.defineProperty(vm,key,sharedProperty);
}


function createComputedGetter(key){
  return function computedGetter(){
    let watcher=this._computedWatchers[key];

    if(watcher.dirty){
      watcher.evaluate();
    }
    // 如果当前取完值后 Dep.target还有值  需要继续向上收集
    if(Dep.target){
      // 计算属性watcher 内部 有两个dep  firstName,lastName
      watcher.depend(); // watcher 里 对应了 多个dep
    }
    return watcher.value
    }
}

function initWatch(vm,watch){
  for(let key in watch){
    let handler=watch[key];
    if(Array.isArray(handler)){
      for(let i=0;i<handler.length;i++){
        createWatcher(vm,key,handler[i]);
      }
    }else{
      createWatcher(vm,key,handler);
    }
  }
};

function createWatcher(vm,key,cb){
  return vm.$watch(key,cb);
}