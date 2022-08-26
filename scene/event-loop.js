/*
 * @Date: 2022-05-15 21:34:25
 * @LastEditTime: 2022-08-26 14:09:22
 * @FilePath: /works/js/javascript/scene/event-loop.js
 * @Description: 事件循环，宏任务：setTimeout的优先级>setImmediate优先级
 *                       微任务：nextTick比then优先级高
 */
// 案例1
setImmediate(function () {
    console.log(1);
}, 0);

setTimeout(function () {
    console.log(2);
}, 0);


async function test() {
    const a = await 9
    console.log(a)
    const b = await new Promise((resolve) => {
        resolve(10)
    })
    console.log(b)
}

test()

new Promise(function (resolve) {
    console.log(3);
    resolve();
    console.log(4);
}).then(function () {
    console.log(5);
});

console.log(6);
process.nextTick(function () {
    console.log(7);
});
console.log(8);


//   3,4，6,8,7,9,5,10,2,1


/* 主线程的代码（script也是宏任务）先执行，遇到异步事件讲它挂起
 * 等到异步事件时间到了，将回调函数放入任务队列里
 * 等主线程执行完毕去取任务队列里面的函数
 * 每执行一次宏任务都会清空本次的微任务
 * */

// 案例2
/**
 * setImmediate(() => {
    console.log(1)
  }, 0)
  setTimeout(() => {
    console.log(2)
  }, 0)
  new Promise((resolve) => {
    console.log(3)
    resolve()
    console.log(4)
  }).then(() => {
    console.log(5)
  })
  async function test() {
    const a = await 9
    console.log(a)
    const b = await new Promise((resolve) => {
      resolve(10)
    })
    console.log(b)
  }
  test()
  console.log(6)
  process.nextTick(() => {
    console.log(7)
  })
  console.log(8)
  */