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