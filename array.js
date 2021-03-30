Array.prototype.map=function(fn){
  const result=[];
  for(let i=0;i<this.length;i++){
    if(!this.hasOwnProperty(i)) continue; //处理是稀疏数组的情况
    result.push(fn(this[i],i,this));
  }
  return result;
}
// 使用
// const arr_m=[1,2,3,,5];
// const mapArr=arr_m.map(item=>item * 2);
// console.log(mapArr);

Array.prototype.filter=function(fn){
  const result=[];
  for(let i=0;i<this.length;i++){
    if(!this.hasOwnProperty(i)) continue;
    fn(this[i],i,this) && result.push(this[i]);
  }
  return result;
}
// 使用
// const arr_f=[1,2,3,,5];
// const fliterArr=arr_f.filter(item=>item > 2);
// console.log(fliterArr);

Array.prototype.reduce=function(fn,initValue){
  let result=initValue?initValue:this[0];
  for(let i=initValue ? 1:0;i<this.length;i++){
    if(!this.hasOwnProperty(i)) continue;
    result=fn(result,this[i],i,this);
  }
  return result;
}
// 使用
// const arr_r=[1,2,3,,5];
// const reduceArr=arr_r.reduce((a,b)=>a*b,2);
// console.log(reduceArr);

Array.prototype.every=function(fn){
  let bool=true;
  for(let i=0;i<this.length;i++){
    if(!this.hasOwnProperty(i)) continue;
    if(!fn(this[i],i,this)){
      bool=false;
      break;
    }
  }
  return bool;
}
// 使用
// const arr_e=[1,2,3,5];
// const everyArr=arr_e.every(item=>item>3);
// console.log(everyArr);

Array.prototype.some=function(fn){
  let bool=false;
  for(let i=0;i<this.length;i++){
    if(!this.hasOwnProperty(i)) continue;
      if(fn(this[i],i,this)){
        bool=true;
        break;
      }
  }
  return bool;
}

// const arr_s=[1,2,3,5];
// const someArr=arr_s.some(item=>item>3);
// console.log(someArr);

Array.prototype.find=function(fn){
  let result;
  for(let i=0;i<this.length;i++){
    if(!this.hasOwnProperty(i)) continue;
    if(fn(this[i],i,this)){
      result=this[i];
      break;
    }
  }
  return result;
}

// const arr_f=[1,2,3,5];
// const findArr=arr_f.find(item=>item>6);
// console.log(findArr);

// 利用flat方法封装
function flattening(arr,num=1){
  if(!Array.isArray(arr)) return;
  return arr.flat(num);
}

// 利用reduce实现
function flattening(arr){
  if(!Array.isArray(arr)) return;
  return arr.reduce((a,b)=>a.concat(Array.isArray(b)?flattening(b):a),[]);
}

// 栈实现拉平
function flattening(arr){
  if(!Array.isArray(arr)) return;
  const stack=[...arr];
  const res=[];
  while(stack.length){
      let value=stack.shift();
      Array.isArray(value)?stack.push(...value): res.push(value)
  }
  return res;
}






