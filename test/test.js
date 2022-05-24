function thunkFun() {
    let val;
    //模拟异步操作
    setTimeout(() => {
      let msg = '前端事务所';
      if(val) {
        val(msg); return;
      }
      val = msg;
    }, 1000)
    return (callback) => {
      if(!val) {
        val = callback;  return;
      }
      callback(val);
    }
  }
  //使用
  let run = new thunkFun();
  let callback = val => console.log(val);
  //情况1：模拟先注册回调，而后异步操作才执行完
  run(callback);
  //情况2：模拟异步操作先执行完，而后回调函数才注册
  setTimeout(() => {
    run(callback)
  }, 3000);