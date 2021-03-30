/**
 *
 * @param {*} obj
 * @param {*} visitedArr
 */
let circleObj = {
  foo: {
    name: function () {
      console.log(1);
    },
    bar: {
      name: "bar",
      baz: {
        name: "baz",
        aChild: null, //待会让它指向obj.foo
      },
    },
  },
};
/**原始
 * aChild----foo互为引用。
 * 拷贝
 * aChild----原始的foo互为引用。
 */
let DFSdeepClone = (obj, visitedArr = []) => {
  let _obj = {};
  if (typeof obj === "object" && obj !== null) {
    let index = visitedArr.indexOf(obj);
    _obj = Array.isArray(obj) ? [] : {};
    if (~index) {
      _obj = visitedArr[index];
    } else {
      visitedArr.push(obj); //先将原来保存起来在拷
      for (let item in obj) {
        _obj[item] = DFSdeepClone(obj[item], visitedArr);
      }
    }
  } else if (typeof obj === "function") {
    _obj = eval("(" + obj.toString() + ")");
  } else {
    _obj = obj;
  }
  return _obj;
};
/**
 *
 * @param {*} obj
 */
/**原始
 * aChild----foo互为引用。
 * 拷贝
 * aChild----拷贝的foo互为引用。
 */
let BFSdeepClone = (obj) => {
  let origin = [obj],
    copyObj = Array.isArray(obj) ? [] : {},
    copy = [copyObj],
    visitedQueue = [],    //存放原对象
    visitedCopyQueue = [];  //存放拷贝对象
  while (origin.length > 0) {
    let items = origin.shift(),
      _obj = copy.shift();
    visitedQueue.push(items);
    if (typeof items === "object" && items !== null) {
      for (let key in items) {
        let val = items[key];
        if (val.constructor === Object) {
          let index = visitedQueue.indexOf(val);
          if (~index) {
            _obj[key] = visitedCopyQueue[index];
            visitedQueue.push(_obj);
          } else {
            _obj[key] = {};
            origin.push(val);
            copy.push(_obj[key]);
          }
        } else if (val.constructor === Array) {
          _obj[key] = [];
          origin.push(val);
          copy.push(_obj[key]);
        } else if (typeof val === "function") {
          _obj[key] = eval("(" + val.toString() + ")");
        } else {
          _obj[key] = val;
        }
      }
      visitedCopyQueue.push(_obj);
    } else if (typeof items === "function") {
      copyObj = eval("(" + items.toString() + ")");
    } else {
      copyObj = obj;
    }
  }
  return copyObj;
};

//利用es6特性
function depCopy(target, hash = new WeakMap()) {
  //hash 作为一个检查器，避免对象深拷贝中出现环引用，导致爆栈。
  if (typeof target === "object" && target !== null) {
    if (Array.isArray(target)) {
      result = [];
    } else {
      result = {};
    }
  } else {
    return target;
  }
  if (hash.has(target)) {
    //检查是有存在相同的对象在之前拷贝过，有则返回之前拷贝后存于hash中的对象
    return hash.get(target);
  }
  hash.set(target, result); //备份存在hash中，result目前是空对象、数组。后面会对属性进行追加，这里存的值是对象的栈
  for (let i in target) {
    if (checktype(target[i]) == "Object" || checktype(target[i]) == "Array") {
      result[i] = depCopy(target[i], hash); //属性值是对象，进行递归深拷贝
    } else {
      result[i] = target[i]; //其他类型直接拷贝
    }
  }
  return result;
}
