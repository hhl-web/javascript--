import { nextTick } from "../utils";
let has={};
let queue=[];
function flushSchedulerQueue(){
  for(let i=0;i<queue.length;i++){
    queue[i].run();
  }
  queue=[];
  has={};
  pedding=false;
}

let pedding=false;
export function queueWatcher(watcher){
  const id=watcher.id;
  if(has[id]==null){
    queue.push(watcher);
    has[id]=true;
    if(!pedding){
      nextTick(flushSchedulerQueue);
      pedding=true;
      // 使用
      // setTimeout(()=>{
      //   flushSchedulerQueue();
      //   pedding=true;
      // },0)
    }
  }
}