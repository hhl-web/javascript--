
import { mergeOptions } from "../utils";
export function initGlobalApi(Vue){
  Vue.options={};
  Vue.mixin=function(options){
    this.options=mergeOptions(this.options,options);
    return this;
  }

  Vue.options._base=Vue;
  Vue.options.component={};
  Vue.component = function (id,definition){
    // 保证组件的隔离， 每个组件都会产生一个新的类，去继承父类
    definition = this.options._base.extend(definition);
    this.options.components[id] = definition;
  }
  // extend方法是用来产生一个继承于Vue的类
  Vue.extend=function(opts){
    const super=this;
    const sub=function Vuecomponent(options){
      this._init(options);
    }
    Sub.prototype=Object.create(super.prototype);
    Sub.prototype.constructor=Sub;
    Sub.options = mergeOptions(Super.options,opts);// 只和Vue.options合并
    return Sub;
  }

}