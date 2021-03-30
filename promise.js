Promise.prototype._all=function(promiseList){
  const len=promiseList.length,result=[];
  let count=0;
  return new Promise((resolve,reject)=>{
    for(let i=0;i<len;i++){
      promiseList[i]().then(res=>{
        result[i]=res;
        count++;
        if(count===len){
          resolve(result);
        }
      },(err)=>{
        return reject(err);
      })
    }
  })
}

Promise.prototype._race=function(promiseList){
  const result=[];
  return new Promise((resolve,reject)=>{
    for(let i=0;i<promiseList.length;i++){
      promiseList[i]().then(res=>{
        return resolve(res)
      },err=>{
        return reject(err);
      })
    }
  })
}
// 走到最后，无论对错都会执行一遍fn
Promise.prototype._finally=function(fn){
  return this.then(res=>{
    Promise.resolve(fn()).then(res=>{
      return res;
    })
  },err=>{
    Promise.reject(fn()).then(err=>{
      throw err
    })
  })
}