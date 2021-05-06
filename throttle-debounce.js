/**
 * 节流：如果你持续触发事件，每隔一段时间，只执行一次事件。
 * 时间戳：一上来就立即执行,但是结束事件就会立即停止
 * 定时器：一上来不立即执行，先延迟一段时间。但是结束事件会执行最后一次。
 */
/**
 *
 * @param {*} fn
 * @param {*} waiting
 * @param {*} options
 * 三个临界值：
 */
const throttle=(fn, waiting = 1000, option) =>{
  let preTime = new Date(0).getTime(),
      options = option || {
        firstTime: true,
        endTime: false,
      },
      timer;
  let _throttle = (...args) => {
    let newTime = new Date().getTime();
    if (!options.firstTime) {
      if (timer) return;
      timer = setTimeout(() => {
        fn.apply(fn, args);
        timer = null;
      }, waiting);
    } else if (newTime - preTime > waiting) {
      fn.apply(fn, args);
      preTime = newTime;
    } else if (options.endTime) {
      timer = setTimeout(() => {
        fn.apply(fn, args);
        timer = null;
      }, waiting);
    }
  };
  _throttle.cancel = () => {
    preTime = 0;
    clearTimeout(timer);
    timer = null;
  };
  return _throttle;
}
//这个逻辑不易懂，不清晰
function throttle_Mt(fn, waiting = 1000, option) {
  let preTime,
    timer,
    options = option || { firstTime: false, endTime: true };
  let _throttle = (...args) => {
    preTime = !!options.firstTime ? new Date(0).getTime() : new Date().getTime;
    let nowTime = new Date().getTime();
    if (newTime - preTime > waiting) {
      if (timer) {
        clearTimeout(timer);
        timer = null;
      }
      fn.apply(fn, args);
      preTime = nowTime;
    } else if (options.endTime && !timer) {
      timer = setTimeout(() => {
        fn.apply(fn, args);
        timer = null;
        preTime = !!options.firstTime
          ? new Date(0).getTime()
          : new Date().getTime;
      }, waiting);
    }
  };
  _throttle.cancel = () => {
    clearTimeout(timer);
    timer = null;
    preTime = 0;
  };
  return _throttle;
}
/**
 * 防抖
 */
const  debounce=function(fn,waiting=1000,immediate=true){
    let timer,firstTime=immediate;
    let _debounce=(...args)=>{
        if(timer){
            clearTimeout(timer);
            timer=null;
        }
        if(firstTime){
            firstTime=false;
            fn.apply(fn,args)
        }else{
            timer=setTimeout(()=>{
                fn.apply(fn,args);
                timer=null;
            },waiting)
        }
    }
    _debounce.cancel=()=>{
        clearTimeout(timer);
        timer=null;
    }
    return _debounce;
}
