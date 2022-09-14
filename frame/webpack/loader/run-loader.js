const fs = require("fs");
const path = require("path");

function createLoaderObject(loaderPath){
  let obj={data:{}};  //data是用来在normal和pitch传递数据的属性
  obj.request=loaderPath; //loader这个文件的绝对路径
  obj.normal=require(loaderPath); //正常的loader函数
  obj.pitch=obj.normal.pitch;  //pitch函数
  return obj;
}
// 
function property(loaderContext){
  Object.defineProperty(loaderContext,'request',{
    get:function(){
      return loaderContext.loaders.map(loaders=>loaders.request).concat(loaderContext.resource).join(',')
    }
  })
  Object.defineProperty(loaderContext,'remianingRequest',{
    get:function(){
       
    }
  })
  Object.defineProperty(loaderContext,'currentRequest',{
    get:function(){
      
    }
  })
  Object.defineProperty(loaderContext,'previousRequest',{
    get:function(){
      
    }
  })
}



function runLoaders(options,callback){
  let loaderContext=options.context || {};  //上下文环境
  loaderContext.resource=options.resource;  //模块资源
  loaderContext.loaders=options.loaders.map(createLoaderObject);  //将每个loader转成对象
  loaderContext.loaderIndex=0;  
  loaderContext.readResource=options.readResource;  //fs.readFile函数
  property(loaderContext);
  // 读取文件资源
  function processResource(options, loaderContext, callback) {
    // set loader index to last loader
    loaderContext.loaderIndex = loaderContext.loaders.length - 1;
  
    var resourcePath = loaderContext.resourcePath;1
    if (resourcePath) {
      // requested module is picked up as a dependency
      loaderContext.addDependency(resourcePath);
      // 读取module内容
      options.readResource(resourcePath, function(err, buffer) {
        if (err) return callback(err);
        options.resourceBuffer = buffer;
        // 迭代loader的normal函数
        iterateNormalLoaders(options, loaderContext, [buffer], callback);
      });
    } else {
      iterateNormalLoaders(options, loaderContext, [null], callback);
    }
  }
  // 与iteratePitchingLoaders类似，只不过是从后往前执行每个loader的normal函数
  function iterateNormalLoaders(options, loaderContext, args, callback) {
    if (loaderContext.loaderIndex < 0) return callback(null, args);

    var currentLoaderObject = loaderContext.loaders[loaderContext.loaderIndex];

    // iterate
    if (currentLoaderObject.normalExecuted) {
      loaderContext.loaderIndex--;
      return iterateNormalLoaders(options, loaderContext, args, callback);
    }

    // 在loadLoader中加载loader的实现，
    // loader默认导出函数赋值给normal属性，pitch函数赋值给pitch属性
    var fn = currentLoaderObject.normal;
    currentLoaderObject.normalExecuted = true;
    if (!fn) {
      return iterateNormalLoaders(options, loaderContext, args, callback);
    }

    // 根据raw来转换args， https://webpack.js.org/api/loaders/#-raw-loader
    convertArgs(args, currentLoaderObject.raw);

    // fn: function ( source, inputSourceMap ) { … }
    runSyncOrAsync(fn, loaderContext, args, function(err) {
      if (err) return callback(err);

      // 将前一个loader的处理结果传递给下一个loader
      var args = Array.prototype.slice.call(arguments, 1);
      iterateNormalLoaders(options, loaderContext, args, callback);
    });
  }
  function runSyncOrAsync(fn,context,args,callback){
    let isAsync=true;
    let isDone=false;
    let isError=false;
    let reportedError =false;
    let innerCallback=(context.callback =function(){
      if(isDone){
        if(reportedError) return;
        throw new Error('async(): The callback was already called.');
      }
      isDone=true;
      isSync=false;
      try{
        finallCallback.apply(null,arguments);
      }catch(e){
        isError=true;
        throw e;
      }
    });
    try{
      var result = (function LOADER_EXECUTION() {
        // 调用fn
        return fn.apply(context, args);
      })();
      // 异步loader fn应该在开头执行this.async, 以保证修改isSync为false，从而不会执行此处逻辑
      if (isSync) {
        isDone = true;
        if (result === undefined) return finallCallback();
        if (result && typeof result === 'object' && typeof result.then === 'function') {
          return result.catch(callback).then(function(r) {
            finallCallback(null, r);
          });
        }
        return finallCallback(null, result);
      }
    }catch{
      if (isError) throw e;
        if (isDone) {
          // loader is already "done", so we cannot use the callback function
          // for better debugging we print the error on the console
          if (typeof e === 'object' && e.stack) console.error(e.stack);
          else console.error(e);
          return;
        }
        isDone = true;
        reportedError = true;
        callback(e);
      }
    }
    context.async=function async(){
      if(isDone){
        if(reportedError) return;
        throw new Error('async(): The callback was already called.');
      }
      isAsync=false;
      return innerCallback;
    }

  }
  function iteratePitchingLoaders(options,loaderContext,finallCallback){
    if(loaderContext.loaderIndex>=loaderContext.loaders.length) return processResource(options,loaderContext,callback);
    let currentLoaderObj=loaderContext.loaders[loaderContext.loaderIndex];  //获取当前的loader
    
    // 如果当前的loader的pitch已经执行过，继续递归下一个loader
    if(currentLoaderObj.pitchExecuted){
      loaderContext.loaderIndex++;
      return iteratePitchingLoaders(options.loaderContext,finallCallback);
    }

    loadLoader(currentLoaderObj,function(err){
      if(err) return finallCallback(err);
      let pitchFn=currentLoaderObj.pitch; //pitch函数
      currentLoaderObj.pitchExecuted=true;
      if(!pitchFn){
        loaderContext.loaderIndex++;
        return iteratePitchingLoaders(options,loaderContext,finallCallback);  //找不到pitch函数往下走
      }
    })

    runSyncOrAsync(pitchFn,loaderContext,[loaderContext.remainingRequest,loaderContext.previousRequest,(currentLoaderObj.data={})],function(err){
      if(err) return finallCallback(err);
      let args=Array.prototype.slice.call(arguments,1);  //
      if(args.length>0){
        loaderContext.loaderIndex--;
        iterateNormalLoadrs(options,loaderContext,args,finallCallback)
      }else{
        iteratePitchingLoaders(options,loaderContext,finallCallback)
      }
    })
  }

}



runLoaders({
  resource:'',//模块路径
  loaders:[],//options中配置的loader
  context:'',  //上下文环境
  readResource:fs.readFile.bind(fs),  //读取资源
},(err,result)=>{
  console.log(result)
})