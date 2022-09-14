(function(modules) {
    var installedModules  = {};
    var installedChunks = {main:0}
    // webpackJsonp 的 push 方法，最终执行的是 webpackJsonpCallback 中的代码
    function webpackJsonpCallback(data){
        let chunkIds = data[0];//title
        let moreModules = data[1];
        let resolves = [];
        for(let i=0;i<chunkIds.length;i++){
            let chunkId = chunkIds[i];
            resolves.push(installedChunks[chunkId][0]);//installedChunks[chunkId]=[resovle,reject,promise]
            installedChunks[chunkId]=0;//0表示已经加载成功
        }
        for(let moduleId in moreModules){
           modules[moduleId]=moreModules[moduleId];
        }
        //[resolve1,resolve2,resolve3]
        while(resolves.length){//数组的shift方法表示取出第一个元素[1,2,3] 1 2 3
            resolves.shift()();
        }
        if(parentJsonFunction){
            //虽然我把数组的push方法重写了，但是老的数组的push方法也保留在parentJsonFunction
           parentJsonFunction(data);// push到数组为了防止已加载的文件重新加载 下次加载该文件时 会跑一下webpackJsonpCallback 为了把已经加载过的文件 重新放进installedModules 缓存中 就不会出现重复加载了
        }
    }
    function __webpack_require__(moduleId){
        if(installedModules[moduleId]){
            return installedModules[moduleId];
        }
        var module = installedModules[moduleId] = {
            i:moduleId,
            l:false,
            exports:{}
        }
        modules[moduleId].call(module.exports,module, module.exports, __webpack_require__);
        module.l = true;
        return module.exports;
    }
  // 异步文件加载完成 并且缓存了异步文件模块 执行这个函数 返回结果
    __webpack_require__.t = function(value,mode){//7 1+2+4 对应二进制111
      value = __webpack_require__(value);// 执行异步模块 
      let ns = Object.create(null);
      Object.defineProperty(ns, '__esModule', { value: true });//表示这是一个esmodules
      Object.defineProperty(ns, 'default', { value });
      return ns;//{__esModule:true,default:'title'} 返回结果
    }
  // 异步加载先调用  __webpack_require__.e 
    __webpack_require__.e = function(chunkId){//title
     //let promises = [];//声明一个promise
     var installChunkData = installedChunks[chunkId];//取得老的代码块数据 undefined
     let promise = new Promise(function(resolve,reject){
         installChunkData = installedChunks[chunkId] = [resolve,reject];
     });//如果调用了resolve方法，则此promise会变成成功态
     installChunkData[2]= promise;//installChunkData=[resolve,reject,promise]
     var script = document.createElement('script');//创建一个脚本
     script.src = chunkId+'.bundle.js';//title.bundle.js
     document.head.appendChild(script);
    //  push方法是写在文件中的 => 当文件加载好了 push方法自然调用=>然后就会调用webpackJsonpCallback=> promise即可变成resolve
     return promise;
    }
   //  使用jsonp数组来使得promise成功
    var jsonArray = window["webpackJsonp"]? window["webpackJsonp"]:[];
    //jsonArray=window["webpackJsonp"]=[];
    var oldJsonpFunction = jsonArray.push.bind(jsonArray);

    // 1 文件还没请求回来 重写 window["webpackJsonp"]的push方法，等文件加载完毕执行webpackJsonpCallback
    jsonArray.push = webpackJsonpCallback;

    // 2 文件请求回来直接执行回调函数 存进installedModules缓存模块总对象  
    jsonpArray = jsonpArray.slice();
    for(var i = 0; i < jsonpArray.length; i++) webpackJsonpCallback(jsonpArray[i]);
    var parentJsonFunction = oldJsonpFunction;//老数组的push方法

    return __webpack_require__("./src/index.js"); 
 })({
   "./src/index.js": function(module, exports, __webpack_require__) {
     let button = document.createElement("button");
     button.innerHTML = "请点我";
     button.addEventListener("click", () => {
       __webpack_require__
         .e("title")
         .then(__webpack_require__.t.bind(null,"./src/title.js",7))//t 保证result肯定是一个地象，而且 有title属性
         .then(result => {//{__esModule:true,default:'title'}
           console.log(result.default);
         });
     });
     document.body.appendChild(button);
   }
 });
 