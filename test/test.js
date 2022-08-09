// const api = async () => {
//     await new Promise((resolve, reject) => {
//         setTimeout(resolve, 1000)
//     })
//     return {
//         a: 1
//     }
// }

// const test = async () => {
//     await 9
//     return {
//         b: 2
//     }
// }

// api().then((res) => {
//     console.log(res)
// });
// console.log(test())     //Promise { <pending> }
// test().then(res => {
//     console.log(res)
// })


// const p = new Promise((resolve,reject)=>{
//     resolve(1)
// });
// p.then((res)=>{
//     console.log(res)
// })
// console.log(p) //Promise


// const delay = () => new Promise((resolve) => setTimeout(resolve, 1000));
// const task=() => delay().then(() => console.log("d"));
// task();






