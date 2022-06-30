class Scheduler {
    constructor(options){
        this.max = options.max || 5;
        this.stack =[];
        this.count = 0;
    }
    add(fn) {
        this.stack.push(fn);
        if(this.count <=this.max){
            this.run()
        }
    }
    async run(){
        if(!this.stack.length) return;
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
    max:1
});

// 包装异步任务 添加异步任务
const addTask = (time, order) => {
    scheduler.add(() => timeout(time).then(() => console.log(order)));
}

addTask(1000,'红灯亮');

addTask(2000,'绿灯亮');

addTask(3000,'黄灯亮');