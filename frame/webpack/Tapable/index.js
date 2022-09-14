// const {SyncHook,SyncBailHook,SyncWaterfallHook,SyncLoopHook,AsyncParallelHook}=require('tapable');
const AsyncParallelHook =require('./hook')
class Lesson{
  constructor(){
    this.hooks={
      // lesson:new SyncHook(['name']),  //传入参数，表示触发事件时可接收的参数个数
      // lessonBail:new SyncBailHook(['name']),
      // lessonWater:new SyncWaterfallHook(['name']),
      asyncLessonParall:new AsyncParallelHook(['name']),
    }
  }
  // 注册事件
  // tap(){
  //   this.hooks.lesson.tap('node',(data)=>{
  //     console.log(1,data)
  //   });
  //   this.hooks.lesson.tap('react',(data)=>{
  //     console.log(2,data)
  //   });
  // }
  // 发布事件
  start(name){
    // this.hooks.lesson.call(name);
    // this.hooks.lessonBail.call(name);
    // this.hooks.lessonWater.call(name);
    this.hooks.asyncLessonParall.callAsync(name,()=>{
      console.log('end');
    })
  }
}

const task=new Lesson();
// 注册两个不同的时间
//SyncHook
// task.hooks.lesson.tap('node',(data)=>{
//   console.log('node',data)
// });
// task.hooks.lesson.tap('react',(data)=>{
//   console.log('react',data)
// });

//SyncBailHook
// task.hooks.lessonBail.tap('node-bail',(data)=>{
//   console.log('node-bail',data);
//   // return 123;  //非undefined的值就不会向下传递

// })
// task.hooks.lessonBail.tap('react-bail',(data)=>{
//   console.log('react-bail',data)
//   return 'react->vue'
// })
// task.hooks.lessonBail.tap('vue-bail',(data)=>{
//   console.log('react-bail',data)
// })
//SyncWaterfallHook
// task.hooks.lessonWater.tap('node-water',(data)=>{
//   console.log('node-water',data);
//   return 133;
// })
// task.hooks.lessonWater.tap('react-water',(data)=>{
//   console.log('react-water',data)
// })

task.hooks.asyncLessonParall.tapAsync('node-water',(data,cb)=>{
  setTimeout(()=>{
    console.log('node-water',data);
    cb();
  },1000)
})
task.hooks.asyncLessonParall.tapAsync('react-water',(data,cb)=>{
  setTimeout(()=>{
    console.log('react-water',data);
    cb();
  },1000)
})
task.start('hhl');
