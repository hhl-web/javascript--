/**
 * 缓存异步接口
 * - 第一次请求缓存接口的时候，和调用原异步接口效果一样
 * - 缓存接口根据入参缓存原异步接口返回值
 * - 有缓存值的时候，马上返回缓存值，并发起请求更新缓存值
 * - 对于同样的入参，缓存接口同一时刻，最多只会发起一个请求
 * @param fn 原异步接口
 * @returns 缓存接口
 */

 const mockApi=(()=>{
    let id =0;
    return async (req)=>{
      await  new Promise((r)=>setTimeout(r,1000));
      return {
        req,
        id:id++
      }
    }
  })();
  
  /**
  一个promsie可以then多次 ，但是值是相同的
  利用lock的概念来控制请求次数
  map的思想做缓存
  await 下面的代码是微任务的存在形式 等本轮主线程的代码执行完毕 会去清空本轮产生的微任务
  */
  function cacheApi(...args){
    const api =args[0];
    const caches = {};
    const handler =async(key)=>{
      if(caches[key] && caches[key].lock){
        if(caches[key].data){
          return caches[key].data
        }else{
          return await caches[key].promsie; 
        }
      }
      if(!caches[key]){
        caches[key]={};
        caches[key].data =null;
        caches[key].promsie = api(key);
        caches[key].lock =true;
      }
      if(caches[key].data){
         caches[key].promsie =api(key);
         caches[key].lock = true;
         caches[key].promsie.then((res)=>{
            caches[key].data =res;
            caches[key].lock = false;
         })
        return caches[key].data;
        
      }else{
        const ret=await caches[key].promsie;
        caches[key].data = ret;
        caches[key].lock = false;
        return ret;
      }
    };
    return handler;
  }
  
  
  
  const cachedApi = cacheApi(mockApi);
  
  (async () => {
      console.log('111',
  //                 { id : 0} +1   id:{id: 1} +1
          await Promise.all([cachedApi("a"), cachedApi("b"), cachedApi("a")])
      );
      // 一秒钟后输出 [ { req: "a", id: 0 }, { req: "b", id: 1 }, { req: "a", id: 0 } ]
  
      console.log(
  //       id 2 +1  id 3 +1  lock 不加
          await Promise.all([cachedApi("a"), cachedApi("b"), cachedApi("a")])
      );
      // 马上输出 [ { req: "a", id: 0 }, { req: "b", id: 1 }, { req: "a", id: 0 } ]
  
      await new Promise((r) => setTimeout(r, 1000));
      console.log(
  //       id 4 +1   id 5 +1 lock不加
          await Promise.all([cachedApi("a"), cachedApi("b"), cachedApi("a")])
      );
      // 马上输出 [ { req: "a", id: 2 }, { req: "b", id: 3 }, { req: "a", id: 2 } ]
    
  //   5 6
  })();
  