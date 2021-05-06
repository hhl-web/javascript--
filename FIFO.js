/**
 * 设置缓存上限，先进先出的思想。我们通过记录数据使用的key，当缓存大小即将溢出时，优先清除离当前时间最远的数据
 */

class FifoCache{
  constructor(limit){
    this.limit=limit || 10;
    this.map=Object.create(null); //缓存  
    this.keys=[];  //记录
  }
  // keys 和 map  keys的每一个key的位置在map中是对应的
  set(key,value){
    if(!this.map.hasOwnProperty(key)){
      if(this.keys.length >=this.limit){
        delete this.map[this.keys.shift()];
      }
      this.keys.push(key);
      this.map[key]=value;
    }

  }
  get(key){
    return this.map[key];
  }
}