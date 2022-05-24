

// 控制并发数目，关键点在于 任务队列缓存异步函数，通过size来控制任务数量。异步串行 递归
// Promise异步任务结束后 减少size 直接从任务池中取出一个新任务来执行。
class TaskConcurrent {
    constructor(size) {
        this.max = size;
        this.size = 0;
        this.taskQueue = [];
    }
    addTask(fn, params) {
        return new Promise((resove, reject) => {
            const fnObj = this.createFn(fn, params, resove, reject);
            this.taskQueue.unshift(fnObj);
            if (this.size <= this.max) {
                this.queueOutTask()
            }
        })
    }
    createFn(fn, params, resolve, reject) {
        return {
            fn,
            params,
            resolve,
            reject,
        }
    }
    queueOutTask() {
        if (!this.taskQueue.length) return;
        this.size++;
        const { fn, params, resolve, reject } = this.taskQueue.pop();
        // this.runTask(fn, params, resolve, reject);
        const taskPromise =  this.runTask(fn, params, resolve, reject);
        resolve(taskPromise);

    }
    runTask(fn, params, resolve,reject) {
        // Promise.resolve(fn(params)).then((res)=>{
        //     console.log('异步结束', res);
        //     resolve(res)
        //     this.size--;
        //     this.queueOutTask();
        // },(err)=>{
        //     this.size--;
        //     this.queueOutTask();
        //     reject(err);
        // })
        const taskPromise = Promise.resolve(fn(params))
        taskPromise.then(res => {
            console.log('异步结束', res)
            this.pullTask() // 取出新的回调
        }).catch(err => {
            this.pullTask() // 取出新的回调
            reject(err);
        })
        return taskPromise;
    }
    pullTask() {
        this.size--
        this.queueOutTask()
    }
}


// 模拟异步任务1
// 调用addTask一个一个添加异步任务
const task = (timeout) => new Promise((resolve) => setTimeout(() => {
    resolve(timeout) // 返回值
}, timeout))
const taskList = [5000, 3000, 1000, 10300, 8000, 2000, 4000, 5000]
async function startNoConcurrentControl() {
    // 初始化并发池
    const cc = new TaskConcurrent(2)
    console.time('异步执行时间')
    // 添加所有异步任务
    const resArr = await Promise.all(taskList.map((item) => cc.addTask(task, item)))
    console.log('异步任务返回值', resArr)
    console.timeEnd('异步执行时间')
}
startNoConcurrentControl()