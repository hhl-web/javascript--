// 串行迭代--需要一个中间函数
function asyncToGenerator(genF) {
  return new Promise(function(resolve, reject) {
    const gen = genF();  //生成一个迭代器
    const step=(type,args)=>{
      let next;
      try {
        next=gen[type](args);
      } catch(e) {
        return reject(e);
      }
      const {done,value}=next;
      if(done) {
        return resolve(value);
      }
      Promise.resolve(value).then(val=>step('next',val),err=>step('throw',err);
    }
    step('next');
  });
}