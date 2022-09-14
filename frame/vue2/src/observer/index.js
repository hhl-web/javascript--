import {isObject} from '../utils/index.js';
import {newArrayProperty} from './array.js'
import Dep from './dep.js';

// 数据劫持类
class Observer{
  constructor(data){
    this.dep=new Dep();   //数据可能是对象也可能是数组
    // 在 data对象上添加__ob__属性，所以被劫持的数据都拥有__ob__属性,将data和Observer类进行关联
    Object.defineProperty(data,'__ob__',{
      value:this,
      enumerable:false
    });

    if(Array.isArray(data)){
      data._proto_=newArrayProperty;
      this.observeArray(data)
    }else{
      this.walk(data)
    }
  }

  observeArray(data){
    data.forEach(item=>observe(item));
  }

  walk(data){
    Object.keys(data).forEach(key=>{
      defineReactive(key,data[key],data)
    })
  }
}

function dependArray(value){
  for(let i = 0; i < value.length;i++){
      let current = value[i]; // current是数组里面的数组 [[[[[]]]]]
      current.__ob__ &&  current.__ob__.dep.depend();
      if(Array.isArray(current)){
          dependArray(current);
      }
  }
}

function defineReactive(key,val,data){
  let childOb=observe(val);
  let dep=new Dep();
  Object.defineProperty(data,key,{
    get(){
      if(Dep.target){
        dep.depend();
        if(childOb){
          childOb.dep.depend();   //数组 对象也要进行依赖收集
          if(Array.isArray(val)){
            dependArray(val);
          }
        }
      }
      return val;
    }
    set(newVal){
      observe(newVal);
      val=newVal;
      dep.notify();
    }
  })
}


export function observe(data){
  if(!isObject(data)) return;
  if(data.__ob__) return data.__ob__;
  return new Observer(data);
}