const myNew=(...args)=>{
  const [fn,...other]=args;
  const target=Object.create(fn.prototype);
  const res=fn.apply(target,other);
  if(res && (typeof res ==='object' || typeof res==='function')) {
    return res;
  }
  return target;
}