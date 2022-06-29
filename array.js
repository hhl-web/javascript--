/**
 * 数组方法的实现
 */
Array.prototype.map = function (fn) {
  const result = [];
  for (let i = 0; i < this.length; i++) {
    if (!this.hasOwnProperty(i)) continue; //处理是稀疏数组的情况
    result.push(fn(this[i], i, this));
  }
  return result;
}
// 不会改变原数组，返回过滤条件为true的item
Array.prototype.filter = function (fn) {
  const result = [];
  for (let i = 0; i < this.length; i++) {
    if (!this.hasOwnProperty(i)) continue;
    fn(this[i], i, this) && result.push(this[i]);
  }
  return result;
}

Array.prototype.reduce = function (fn, initValue) {
  let result = initValue ? initValue : this[0];
  for (let i = initValue ? 0 : 1; i < this.length; i++) {
    if (!this.hasOwnProperty(i)) continue;
    result = fn(result, this[i], i, this);
  }
  return result;
}

Array.prototype.every = function (fn) {
  let bool = true;
  for (let i = 0; i < this.length; i++) {
    if (!this.hasOwnProperty(i)) continue;
    if (!fn(this[i], i, this)) {
      bool = false;
      break;
    }
  }
  return bool;
}

Array.prototype.some = function (fn) {
  let bool = false;
  for (let i = 0; i < this.length; i++) {
    if (!this.hasOwnProperty(i)) continue;
    if (fn(this[i], i, this)) {
      bool = true;
      break;
    }
  }
  return bool;
}


Array.prototype.find = function (fn) {
  let result;
  for (let i = 0; i < this.length; i++) {
    if (!this.hasOwnProperty(i)) continue;
    if (fn(this[i], i, this)) {
      result = this[i];
      break;
    }
  }
  return result;
}

/**
 * 拉平数组
 */

// 利用flat方法封装
function flattening(arr, num = 1) {
  if (!Array.isArray(arr)) return;
  return arr.flat(num);
}

// 利用reduce实现
function flattening(arr) {
  if (!Array.isArray(arr)) return;
  return arr.reduce((a, b) => a.concat(Array.isArray(b) ? flattening(b) : b), []);
}

// 栈实现拉平
function flattening(arr) {
  if (!Array.isArray(arr)) return;
  const stack = [...arr];
  const res = [];
  while (stack.length) {
    let value = stack.shift();
    Array.isArray(value) ? stack.push(...value) : res.push(value)
  }
  return res;
}

// 递归实现  数组的顺序和还没拉平的数组一致
function flattening(arr) {
  if (!Array.isArray(arr)) return;
  // let res = [];
  // function next(arr) {
  //   let index = 0;
  //   while (index <= arr.length - 1) {
  //     if (Array.isArray(arr[index])) {
  //       arr[index++].forEach(item => Array.isArray(item) ? next(item) : res.push(item));
  //     } else {
  //       res.push(arr[index++]);
  //     }
  //   }
  // }
  // next(arr);
  // return res;
  const dfs = (data) => {
    if (!Array.isArray(arr)) return data;
    let idx = 0;
    let res = [];
    while (idx < data.length) {
      if (Array.isArray(data[idx])) {
        data[idx++].forEach(item => Array.isArray(item) ? res.push(...dfs(item)) : res.push(item));
      } else {
        res.push(data[idx++]);
      }
    }
    return res;
  }

}

let arr = [1, 2, 3, [2, 33, 4], 3, [35, 44, [67, 90, [3322]]]];
console.log(flattening(arr))
/*
* 数组去重
*/
const testArr = [1, "true", true, 15, false, undefined, null, NaN, NaN, "NaN", 0, "a", {}, {}, { test: 1 }];

// indexOf 无法识别NaN
function unique_indexOf(arr) {
  let result = [];
  for (let i = 0; i < arr.length; i++) {
    if (result.indexOf(arr[i]) === -1) {
      result.push(arr[i])
    }
  }
  return result;
}

// includes
function unique_includes(arr) {
  if (!Array.isArray(arr)) return;
  let result = [];
  for (let i = 0; i < arr.length; i++) {
    if (!result.includes(arr[i])) {
      result.push(arr[i])
    }
  }
  return result;
}

// es6 set
function unique_Set(arr) {
  if (!Array.isArray(arr)) return;
  return Array.from(new Set(arr));
}


