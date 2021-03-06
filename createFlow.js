// 异步并行  ,fn这个函数返回一个promise
const asyncParallel_p = (...fns) => {
  let count = 0;
  return function (...args) {
    const [cb, ...others] = args;
    fns.forEach(async fn => {
      await fn.apply(fn, others);
      count++;
      if (count === fns.length) cb();
    })
  }
}

const asyncParallel = (...fns) => {
  return function (...args) {
    let count = 0;
    const [cb, ...others] = args;
    fns.forEach(fn => {
      Promise.resolve(fn(...args)).then(res => {
        ++count;
        if (count === this.tasks.length) return cb();
      })
    })
  }
}

// 异步串行
const asyncSerial = (...fns) => {
  const [first, ...others] = fns;
  return (...args) => {
    return others.reduce((a, b) => Promise.resolve(a).then(() => b(...args)), first(...args));
  }
}


