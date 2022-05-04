/**
 * 
 * - WeakMap的键名必须都是对象
 * - WeakMap是弱引用
 */
function depCopy(target, hash = new WeakMap()) {
  let result;
  //hash 作为一个检查器，避免对象深拷贝中出现环引用，导致爆栈。
  if (typeof target === "object" && target !== null) {
    result = Array.isArray(target)?[]:{};
  } else {
    return target;
  }
  if (hash.has(target)) {
    //检查是有存在相同的对象在之前拷贝过，有则返回之前拷贝后存于hash中的对象
    return hash.get(target);
  }
  hash.set(target, result); //备份存在hash中，result目前是空对象、数组。后面会对属性进行追加，这里存的值是对象的栈
  for (let i in target) {
    if (target[i].constructor === Object || target[i].constructor === Array) {
      result[i] = depCopy(target[i], hash); //属性值是对象，进行递归深拷贝
    } else {
      result[i] = target[i]; //其他类型直接拷贝
    }
  }
  return result;
}
