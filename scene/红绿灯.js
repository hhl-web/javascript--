// 题目：使用Promise实现红灯每隔3s亮一次，黄灯每隔2s亮一次，绿灯每隔1s亮一次，循环这个过程。


// 红， 黄 ，绿

/**
 * let stack = ['绿', '黄', '红'];

const task = (stack) => {
    let list = [];
    const promise = (key) => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(key);
                list.push(key);
                if (list.length === stack.length) {
                    list = []
                    helper(stack);
                }
            }, 1000)
        })
    }
    const helper = (stack) => {
        const [first, ...others] = stack;
        return others.reduce((a, b) => a.then(() => promise(b)), promise(first))
    }
    helper(stack);
}



task(stack);
**/

const task = (light, timer) => {
    return new Promise(resolve => {
      setTimeout(() => {
        if (light === 'red') {
          console.log('红灯亮')
        } else if (light === 'yellow') {
          console.log('黄灯亮')
        } else {
          console.log('绿灯亮')
        }
        resolve()
      }, timer)
    })
  }

const taskLoop =()=>{
    task('red',3000)
        .then(()=>task('yellow',2000))
        .then(()=>task('green',1000))
        .then(taskLoop);
}