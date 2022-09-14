import {initState} from './initState.js'
import {compilerToFunction} from './compiler/index.js';
import {mountComponent} from './lifecycle.js'
import {mergeOptions} from './utils/index.js'

export function initMixin(Vue){
  Vue.property._init=function(options){

    const vm=this;
    vm.$options=mergeOptions(vm.constructor.options, options);

    callHook(vm,'beforeCreate');

    // 调用initState,初始化props  data  computed  watch
    initState(vm);

    callHook(vm,'created');

    if(vm.$options.el){
      // 将数据挂载到模板上 
      vm.$mount(vm.$options.el)
    }
  }
  Vue.property.$mount=function(el){
    const vm=this;
    const options=vm.$options;
    vm.$el=el;
    if(!options.render){  //render  template  el
      let template =options.template;
      if(! template& el){
        template=el.outerHTML;  //内容包含描述元素及其后代的序列化HTML片段。
        // 生成render函数,将模板转化成对应的渲染函数
        let render=compilerToFunction(template);
        options.render= render;   //是渲染函数  如何将虚拟dom =》真实的元素
      }
    }
    // $options.render
    mountComponent(vm,el)
  }
}