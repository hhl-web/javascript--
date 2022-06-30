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






























