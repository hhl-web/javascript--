// fn是每个函数的处理逻辑，args是剩余的参数数组
function memory(...args){
  const [fn,...others]=args;
	if(!memory.prototype.cache){
		memory.cache={};
	}
	const arg=JSON.stringify(others);
	if(memory.cache[arg]){
		return memo.cache[arg];
	}
	//利用回调函数来解决异步的问题
	const callback=(data)=>{
		memory.cache[arg]=data;
	}
  return fn.apply(fn,[callback,...others]);	
}