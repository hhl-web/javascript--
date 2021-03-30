const DfsDeepClone=(obj,visitedArr)=>{
  let _obj;
  if(typeof obj==='object' && obj!==null){
    _obj=Array.isArray(obj)?[]:{};
    const index=visitedArr.indexOf(obj);
    if(~index){
      _obj=visitedArr[index];
    }else{
      visitedArr.push(obj);
      for(let key in obj){
        _obj[key]=DfsDeepClone(obj[key],visitedArr);
      }
    }
  }else if(typeof obj==='function'){
    _obj=eval('('+obj.toString()+')');
  }else{
    _obj=obj;
  }
  return _obj;
}