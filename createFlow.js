// 异步并行  ,fn这个函数返回一个promise
const asyncParallel_p=(...fns)=>{
  let count=0;
  return function(...args){
    const [cb,...others]=args;
    fns.forEach(async fn=>{
      await fn.apply(fn,others);
      count++;
      if(count===fns.length) cb();
    })
  }
}

const asyncParallel=(...fns)=>{
  return function(...args){
    let count=0;
    const [cb,...others]=args;
    fns.forEach(fn=>{
      Promise.resolve(fn(...args)).then(res=>{
        ++count;
        if(count===this.tasks.length) return cb();
      })
    })
  }
}

// 异步串行
const asyncSerial=(...fns)=>{
  const [first,...others]=fns;
  return (...args)=>{
    return others.reduce((a,b)=>Promise.resolve(a()).then(()=>b(...args)),first(...args));
  }
}

// let index=0;
// const next=()=>{
//   if(index===fns.length) return cb();
//   const fn==fns[index++];
//   Promise.resolve(fn).then(res=>next());
// }
// next();

function createFlow(effects = []) {
  let sources = effects.slice().flat();
  function run(callback) {
    while (sources.length) {
      const task = sources.shift();
      // 把callback放到下一个flow的callback时机里执行
      const next = () => createFlow(sources).run(callback)
      if (typeof task === "function") {
        const res = task();
        if (res?.then) {
          res.then(next);
          return;
        }
      } else if (task?.isFlow) {
        task.run(next);
        return;
      }
    }
    callback?.();
  }
  return {
    run,
    isFlow: true,
  };
}
const delay = () => new Promise((resolve) => setTimeout(resolve, 1000));
createFlow([
  () => console.log("a"),
  () => console.log("b"),
  createFlow([() => console.log("c")]),
  [() => delay().then(() => console.log("d")), () => console.log("e")],
]).run();
