export function isFunction(data){
  return typeof data ==='function';
}

export function isObject(data){
  return typeof data ==='object' && data!==null;
}

const callbacks=[];
let padding=false;

function flushCallbacks(){
  callbacks.forEach((cb)=>cb());
  padding=false;
}

function timer(flushCallbacks){
  let timerFn=()=>{};
  if(Promise){
    timerFn=Promise.resolve().then(flushCallbacks)
  }else if(MutationObserver){
    let textNode=document.createTextNode(1);
    let observe=new MutationObserver(flushCallbacks);
    observe.observe(textNode,{
      characterData: true
    })
    timerFn = () => {
      textNode.textContent = 3;
    }
  }else if(setImmediate){
    timerFn = () => {
      setImmediate(flushCallbacks)
    }
  }else{
    timerFn = () => {
      setTimeout(flushCallbacks)
    }
  }
  fn();
}
// 用户写的cb和组件内部自定义的cb一起处理，批次处理。
// 微任务的执行优先级大于宏任务，所以想要数据更新之后立马取到更新之后的内存dom，那么想法上立马想到微任务。
export function nextTick(cb){
  callbacks.push(cb);
  if(!padding){
    timer(flushCallbacks);
    padding=true;
  }
}


let lifeCycleHooks = [
  'beforeCreate',
  'created',
  'beforeMount',
  'mounted',
  'beforeUpdate',
  'updated',
  'beforeDestroy',
  'destroyed',
];
let strats = {}; // 存放各种策略

function mergeHook(parent,child){
  if(child){
    if(parent){
      return parent.concat(child);
    }else{
      return [child]
    }
  }else{
    return parent;
  }
}

strats.components = function(parentVal, childVal) {
  // Vue.options.components
  let options = Object.create(parentVal); // 根据父对象构造一个新对象 options.__proto__= parentVal
  if (childVal) {
      for (let key in childVal) {
          options[key] = childVal[key];
      }
  }
  return options
}

lifeCycleHooks.forEach((hook)=>{
  strats[hook]=mergeHook
})

export function mergeOptions(parentOpt,childOpt){
  const options={};
  for(let key in parentOpt){
    mergeField(key);
  }

  function mergeField(key){
    let parentVal=parentOpt[key];
    let childVal=childOpt[key];

    if(strats[key]){
      options[key]=strats[key](parentOpt,childOpt);
    }else{
      if(isObject(parentVal) && isObject(childVal)){
        options[key]={...parentVal,...childVal};
      }else{
        options[key]= childVal|| parentVal;
      }
    }
  }
  return options;
}

export function isReservedTag(str) {
  let reservedTag = 'a,div,span,p,img,button,ul,li';
  // 源码根据 “，” 生成映射表 {a:true,div:true,p:true}
  return reservedTag.includes(str);
}