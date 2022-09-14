import {initMixin} from './init.js';
import {renderMixin} from './render.js';
import {lifycycleMixin} from './lifecycle/js';

function Vue(options){
  this._init(options);
}

// 调用 initMixin
initMixin(Vue);
renderMixin(Vue); // _render
lifycycleMixin(Vue);