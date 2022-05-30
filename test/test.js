// const morkApi = function (str) {
//   return new Promise((resolve, reject) => {
//     console.log(str,'---');
//     setTimeout(() => {
//       resolve('异步执行成功');
//     }, 1000);
//   })
// }

// class Queue {
//   constructor() {
//     this.micro = Promise.resolve();
//     this.stack = []
//     this.isFlushing = false
//   }
//   addFn(fn,str) {
//     if (typeof fn !== 'function') return
//     this.stack.push(fn)
//     if (!this.isFlushing) {
//       this.isFlushing = true;
//       this.micro.then(() => this.flushStack(str))
//     }
//   }
//   flushStack(str) {
//     const temp = this.stack.slice(0)
//     this.stack.length = 0
//     this.isFlushing = false;
//     console.log(temp)
//     for (let i = 0; i < temp.length; i++) {
//       temp[i](str).then(res => {
//         console.log(res)
//       })
//     }
//   }
// }

// const queue = new Queue();

// queue.addFn(morkApi,'11');
// queue.addFn(morkApi,'11');
// setTimeout(() => {
//   console.log('---settimeout')
//   queue.addFn(morkApi,'22');
//   queue.addFn(morkApi,'22');
//   queue.addFn(morkApi,'22');
// },100)


// // const asyncApis = [morkApi, morkApi, morkApi, morkApi];


// // function run(apis){
// //   const stack =[...apis];
// //   let count = 0;
// //   const next =()=>{
// //     if(stack.length===0) return '执行完毕'
// //     count++;
// //     const api = stack.shift();
// // api().then((res)=>{
// //   console.log(res);
// //   count--;
// //   next();
// // });
// //   }
// //   return next();
// // }

// // run(asyncApis)

// // let c = 4;

// // while (c > 0) {
// //   const api = asyncApis.shift();
// //   api().then((res) => {
// //     console.log(res);
// //     count--;
// //   });
// // }

// const force =true;
// const errorList =[];
// const resourceList =[];
// let ajaxLength =0;
// const timeOut =500;
// if(ajaxLength>=8 && force){
//   //上报
// } 

// setTimeout(()=>{
//   //上报
// },timeOut)

const str ='abb';

for(let i=str.length-1;i<str.length;i++){
  console.log(i)
}