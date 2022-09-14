import {patch} from './vdom/patch.js';
import Watch form './observer/watcher.js';
import {nextTick} from './utils/index.js'

export function lifycycleMixin(Vue){
  // 既可以初始化 也可以更新
  Vue.prototype._update=function(vnode){
    const vm=this;
    vm.$el=patch(vm.$el,vnode);
  }
  Vue.prototype.$nextTick=nextTick;
}

// 挂载组件，模板渲染
export function mountComponent(vm,el){
  let updateComponent=()=>{
    vm._update(vm._render());
  }
  callHook(vm,'beforeMount');

  // 渲染watcher
  new Watcher(vm,updateComponent,()=>{
    console.log(1122,'视图更新了');
  },true);
  callHook(vm,'mounted');
}

export function callHook(vm,hook){
  let handlers = vm.$options[hook];
  if(handlers){
      for(let i =0; i < handlers.length;i++){
          handlers[i].call(vm)
      }
  }
}