/**
 * 选择内存中最近最久未使用的页面予以淘汰。
 * 当有一数据被访问时，该数据会被移动到数组的末尾，
 * 表明最近被使用过，当缓存溢出时，会删除数组的头部数据，即将最不频繁使用的数据移除
 */
class LruCache{
  constructor(limit){
    this.cache=new Map();
    this.limit=limit || 10;
  }
  get(key){
    if(this.cache.has(key)){
      let temp=this.cache.get(key);
      this.cache.delete(key);
      this.cache.set(key,temp);
      return temp;
    }else{
      return -1;
    }
  }
  put(key,value){
    if(this.cache.has(key)){
      this.cache.delete(key);
    }else if(this.cache.size>=this.limit){
      this.cache.delete(this.cache.keys().next().value);  //删除之前没用的key
    }
    this.cache.set(key,value);
  }
}