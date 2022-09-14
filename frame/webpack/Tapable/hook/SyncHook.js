const Hook=require('./Hook');
const HookCodeFactory=require('./HookCodeFactory');
const factory=new HookCodeFactory();
class SyncHook extends Hook{
  // 编译函数，生成静态脚本并执行
  compile(options){
    factory.setup(this,options);
    return factory.create(options);
  }
}


