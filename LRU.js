/**
 * 选择内存中最近最久未使用的页面予以淘汰。最近最少使用策略 Least recently used
 */

/**
 * 数组：
 * 当有一数据被访问时，该数据会被移动到数组的末尾，
 * 表明最近被使用过，当缓存溢出时，会删除数组的头部数据，即将最不频繁使用的数据移除
 * 
 * Map
 * 利用map的特性：后面是经常使用的，前面是非经常使用
 */
class LruCache {
  constructor(limit) {
    this.cache = new Map();
    this.limit = limit || 10;
  }
  get(key) {
    if (this.cache.has(key)) {
      let temp = this.cache.get(key);
      this.cache.delete(key);
      this.cache.set(key, temp);
      return temp;
    } else {
      return -1;
    }
  }
  /**
   * 
 Map.prototype.keys()：返回键名的遍历器。
 Iterator 的遍历过程是这样的。

（1）创建一个指针对象，指向当前数据结构的起始位置。也就是说，遍历器对象本质上，就是一个指针对象。

（2）第一次调用指针对象的next方法，可以将指针指向数据结构的第一个成员。

（3）第二次调用指针对象的next方法，指针就指向数据结构的第二个成员。

（4）不断调用指针对象的next方法，直到它指向数据结构的结束位置。

每一次调用next方法，都会返回数据结构的当前成员的信息。
具体来说，就是返回一个包含value和done两个属性的对象。其中，value属性是当前成员的值，done属性是一个布尔值，表示遍历是否结束。
   */
  put(key, value) {
    if (this.cache.has(key)) {
      this.cache.delete(key);
    } else if (this.cache.size >= this.limit) {
      this.cache.delete(this.cache.keys().next().value);  //删除之前没用的key
    }
    this.cache.set(key, value);
  }
}