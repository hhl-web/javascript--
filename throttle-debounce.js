/**
 * 节流：如果你持续触发事件，每隔一段时间，只执行一次事件。
 * 时间戳：一上来就立即执行,但是结束事件就会立即停止
 * 定时器：一上来不立即执行，先延迟一段时间。但是结束事件会执行最后一次。
 * @param {*} fn
 * @param {*} waiting
 * @param {*} options
 * 三个临界值：
 */

const throttle = (fn, warting, isFirst) => {
  let isImmediate = isFirst;
  let exceDate = +new Date();
  let timer = null;
  const _throttle = (...args) => {
    if (isImmediate) {
      fn.apply(fn, args);
      isImmediate = false;
      exceDate = +new Date();
    } else {
      const curDate = +new Date();
      if (curDate - exceDate >= warting) {
        fn.apply(fn, args);
        exceDate = +new Date();
      } else {
        timer && clearTimeout(timer);
        const delay = warting - (+new Date() - exceDate);
        timer = setTimeout(() => {
          fn.apply(fn, args);
          exceDate = +new Date();
        }, delay);
      }
    }
  };
  _throttle.cancel = () => {
    timer = null;
    clearTimeout(null);
    exceDate = 0;
  };
  return _throttle;
};


/*防抖*/
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
