/**
 * @param {*} fn
 * @param {*} waiting
 * @param {*} options
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
