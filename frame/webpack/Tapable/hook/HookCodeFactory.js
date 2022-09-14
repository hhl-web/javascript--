class HookCodeFactory{
  setup(instance,options){
    this.options=options;
    instance._x=options.map(tap=>tap.callback);
  }
  args(){
    return this.options.args.join(',');
  }
  header(){
    return (
      `
      var _context;
      var _x = this._x;
      `
    )
  }
  content(){
    let code='';
    this.options.taps.forEach(tap => {
      code += (
        `
        var _fn${i} = _x[${i}];
        _fn${i}(${this.args()});
        `
      )
    })
    return code;
  }
  create(options){
    return new Function(this.args(),this.header()+this.content())
  }
}
// 生成的静态脚本
/**
 * (function anonymous(name, age
) {
"use strict";
var _context;
var _x = this._x;

var _fn0 = _x[0];
_fn0(name, age);

var _fn1 = _x[1];
_fn1(name, age);

})
 */