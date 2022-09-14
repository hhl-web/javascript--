(function(modules){
    
    var installedModules ={};
    function __webpack_require__(moduleId){
       if(installedModules[moduleId])  return installedModules[moduleId];
       var module= installedModules[moduleId] ={
           i:moduleId,
           l:false,
           exports:{}
       }
        //执行模块函数
        modules[moduleId].call(
            module.exports,
            module,
            module.exports,
            __webpack_require__
        );
        module.l =true;
        return module.exports;
    }
    return __webpack_require__('./src/index.js')
})({
    './src/index.js':(function(module,exports,__webpack_require__){
        let title = __webpack_require__('./src/title.js'); //this = module.exports
        console.log(title);
    }),
    './src/title.js':(function(module,exports){
        module.exports ='title'
    })
})
// 将所有模块合并到一个对象中作为参数传入自执行函数
// 声明一个变量缓存所有已加载的模块 加载过的模块直接返回
// 加载入口模块
// 重新require 变成 __webpack_require__ 模块中依赖其他模块将递归加载其他模块
// 执行需要加载的模块 返回module.exports