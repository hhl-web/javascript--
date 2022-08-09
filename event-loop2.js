
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
// async1();
// async2();
// async3();



// async3
// async2
// async1
// bulalala3
// async2-promsie
// bulalala2
// async3-setTimeout
// async1-setTimeout
// bulalala1


















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