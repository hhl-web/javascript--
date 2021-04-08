// fn是每个函数的处理逻辑，args是剩余的参数数组
// 如果是不同的函数，相同的参数就会出现问题的
// function memory(...args){
//   const [fn,...others]=args;
// 	if(!memory.cache){
// 		memory.cache={};
// 	}
// 	const key=JSON.stringify(others);
// 	if(memory.cache[key]){
// 		return memo.cache[key];
// 	}
// 	//利用回调函数来解决异步的问题
// 	const callback=(data)=>{
// 		memory.cache[key]=data;
// 	}
//   return fn.apply(fn,[callback,...others]);	
// }

// 分函数，不同参数取值
function memory(fn){
	const cache={};
	return function(...args){
		const key=JSON.stringify(arg);
		if(cache[key]) return cache[key];
		return cache[key]=fn.apply(fn,args);
	}
}