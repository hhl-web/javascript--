function BFSCopy(source){
    if(typeof source !=='object') return ;
    const bool=Array.isArray(source);
    const originObj = bool ?[...source]:{...source};
    const copyObj = bool?[]:{};
    const originQueue =[originObj];
    const copyQueue =[copyObj];
    
    while(originQueue.length){
      const item = originQueue.shift();
      const copyItem =copyQueue.shift();
      for(let key in item){
        const val =item[key]
        if(typeof val === 'object' && val!==null){
             if(Array.isArray(val)){
                copyItem[key] =[];
             }else{
                copyItem[key] ={};
             }
             copyQueue.push(copyItem[key]);
             originQueue.push(val);
        }else{
          copyItem[key] = val;
        }
      }
    }
    return copyObj;
    
  }


const obj = {
    cc: 22,
}
const source = {
    a: 1,
    b: {
        c: 2,
        d: 5,
        i: obj
    },
    key: [1, 3],
    dd: obj
}
const ret = BFSCopy(source);

// const ret =source

console.log(ret);