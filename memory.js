// fn是每个函数的处理逻辑，args是剩余的参数数组
function memory(fn) {
	const cache = {};
	return function (...args) {
		const key = JSON.stringify(arg);
		if (cache[key]) return cache[key];
		return cache[key] = fn.apply(fn, args);
	}
}