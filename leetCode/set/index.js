
const arr = [1,2,2,3,4,5,6,6,7,8];

const arrSet = new Set(arr);

// set ->array
const arrSetToArr1 =[...arrSet];
const arrSetToArr2 =Array.from(arrSet);
console.log(arrSet,arrSetToArr2)
// 判断是否在集合中 has
// 求交集
