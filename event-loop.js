/**案例一 注意await也是promise 但是需要一个个promise添加进去 
 * 所以同一个await里面的promise的顺序可能被其他的promise插队
*/
async function async1() {
    console.log("async1 start");
    await async2();
    console.log("async1 end");
}
async function async2() {
    console.log("async2");
    await Promise.resolve('async2-promsie');
    // await setTimeout(() => {
    //     console.log("async2-setTimeout");
    // }, 0);
    console.log("bulalala");
}
console.log("script start");
setTimeout(function () {
    console.log("setTimeout");
}, 0);
async1();
new Promise(function (resolve) {
    console.log("promise1");
    resolve();
}).then(function () {
    console.log("promise2");
});
console.log("script end");

// script start
// async1 start
// async2
// promise1
// script end
// bulalala
// promise2
// async1 end
// setTimeout
// async2-setTimeout


/**案例二 */
async function async3() {
    console.log("async3");
    await setTimeout(() => {
        console.log("async3-setTimeout");
    }, 0);
    console.log("bulalala3");
}

async function async2() {
    console.log("async2");
    const ret=await Promise.resolve('async2-promsie');
    console.log(ret)
    console.log("bulalala2");
}

async function async1() {
    console.log("async1");
    await new Promise((resolve,reject)=>{
      setTimeout(() => {
        console.log("async1-setTimeout");
        resolve();
       }, 0);
    })
  console.log("bulalala1");
}


/**执行顺序1 */
// async3();
// async2();
// async1();
// async3
// async2
// async1
// bulalala3
// async2-promsie
// bulalala2
// async3-setTimeout
// async1-setTimeout
// bulalala1




/**执行顺序2 */
// async2();
// async1();
// async2
// async1
// bulalala2
// async2-setTimeout
// async1-setTimeout
// bulalala1

/**执行顺序3 */
// async1();
// async2();
// async1
// async2
// bulalala2
// async1-setTimeout
// bulalala1
// async2-setTimeout




/**案例三 
 * 
 * promise 的execute是同步的
 * then是异步的
 * 两个then 是 交替执行的
 * 插队的promise 等于1+3个then 后面的then 要等到前面的then执行三个之后再执行
*/

Promise.resolve().then(()=>{
    console.log(1)
}).then(()=>{
    console.log(3)
})

Promise.resolve().then(()=>{
    console.log(2)
}).then(()=>{
    console.log(4)
})



