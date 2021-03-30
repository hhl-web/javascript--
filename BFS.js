const BfsDeepClone=(obj)=>{
  let originObj=[obj],copyObj=[Array.isArray(obj)?[]:{}],visitedOriginArr=[], visitedCopyArr=[];
  while(originObj.length > 0){
    const item=originObj.shift();
    const _obj=copyObj.shift();
    visitedOriginArr.push(item);
    if(typeof item === 'object' && item!==null){
      for(let key in item){
        const val=item[key];
        if(val.constructor === 'Object'){
          const index=visitedOriginArr.indexOf(item[key]);
          if(~index){
            _obj[key]=visitedCopyArr[index];
          }else{
            _obj[key]={};
            originObj.push(val);
            copyObj.push(_obj[key]);
          }
        }else if(val.constructor === 'Array'){
          _obj[key]=[];
          originObj.push(val);
          copyObj.push(_obj[key]);
        }else if(val.constructor==='function'){
          _obj[key] = eval("(" + val.toString() + ")");
        }else{
          _obj[key]=val;
        }
      }
      visitedCopyArr.push(_obj);
    }else if(typeof item === 'function'){
      _obj = eval("(" + item.toString() + ")");
    }else{
      _obj=item;
    } 
  }
  return copyObj;
}