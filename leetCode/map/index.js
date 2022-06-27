const m =new Map();
//  增

m.set('a','aa');
m.set('b','bb');

// 删

m.delete('a');

// 改
m.set('b','bbb');

// 清空
// m.clear();

// 判断是否存在,返回boolean值
m.has('a');

console.log(m);