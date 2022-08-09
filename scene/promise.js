// 最大并发
class Scheduler {
    constructor(options) {
        this.max = options.max || 5;
        this.stack = [];
        this.count = 0;
    }
    add(fn) {
        this.stack.push(fn);
        if (this.count <= this.max) {
            this.run()
        }
    }
    async run() {
        if (!this.stack.length) return;
        this.count++;
        const task = this.stack.shift();
        await task();
        this.count--;
        this.run();
    }
}

// 异步任务
const timeout = time => {
    return new Promise(resolve => setTimeout(resolve, time));
}

// 调度器
const scheduler = new Scheduler({
    max: 1
});

// 包装异步任务 添加异步任务
const addTask = (time, order) => {
    scheduler.add(() => timeout(time).then(() => console.log(order)));
}

addTask(1000, '红灯亮');

addTask(2000, '绿灯亮');

addTask(3000, '黄灯亮');



// // 根据传入的次数 重启 串行

function login() {
    return new Promise((resolve, reject) => {
        if (Math.random() > 0.9090) {
            resolve('login success')
        } else {
            reject('login error')
        }
    })
}

function helper(fn, size) {
    let errorCount = 0;
    return new Promise((resolve, reject) => {
        const next = () => {
            fn().then((res => {
                resolve(res)
            })).catch((err) => {
                errorCount++;
                if (errorCount <= size) {
                    console.log('重启次数：', errorCount);
                    next();
                } else {
                    errorCount = 0;
                    reject();
                }
            })
        };
        next();
    })

}

helper(login, 3).then((res => {
    console.log(res)
}))


/**
 *  promise状态机 ，then是自定义函数执行之后会执行的函数
 *  promsie串行       利用递归
 *  promise最大并发数  利用队列 + 递归
 *  批量更新 利用队列+微任务
 */
const stack = [];
let isFlushing = false;
function addFn(handler) {
    if (typeof handler !== 'function') return;
    stack.push(handler);
    if (isFlushing) return;
    isFlushing = true;

    Promise.resolve().then(() => flushStack)

}
function flushStack() {
    const temp = stack.slice(0);
    stack.length = 0;
    isFlushing = false;
    for (let i = 0; i < temp.length; i++) {
        temp[i]();
    }
}


