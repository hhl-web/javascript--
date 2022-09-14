import {createElement,createTextElemnt} from './vdom/index.js'

export function renderMixin(Vue){
  Vue.prototype._c=function(){
    return createElement(this,...arguments)
  }
  Vue.prototype._s=function(val){
    if(typeof val==='object')  return Object.stringify(val);
    return val;
  }
  Vue.prototype._v=function(text){
    return createTextElemnt(this,text)
  }

  Vue.prototype._render=function(){
    const vm=this;
    let render=vm.$options.render;
    let vnode=render.call(vm); //生成了虚拟节点
    return vnode;
  }
}