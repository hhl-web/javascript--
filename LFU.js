class LfuCache{
  constructor(limit){
    this.limit=limit;
    this.map={};
    this.freqMap={};
  }
  get(key){
    let val=-1;
    if(typeof this.map[key] != 'undefined'){
      let obj=this.map[key];
      val=obj.value;
      this.update(key,obj);
    }
    return val;
  }
  update(key,obj){
    let frep=obj.frep;
    let arr =this.freqMap[frep];
    this.freqMap[frep].splice(arr.indexOf(key),1);
    if(this.freqMap[frep].length == 0) delete this.freqMap[frep];
    frep =obj.frep =obj.frep+1;
    if(!this.freqMap[frep]) this.freqMap[frep] =[];
    this.freqMap[frep].push(key);
  }
  set(key,value){
    let obj=this.map[key];
    if(this.limit <=0)return;
    if(typeof key=='undefined' || typeof value =='undefined') throw new Error('key or value is undefined');
    if(typeof  obj == 'undefined'){
      if(Object.keys(this.map).length >= this.limit){
        let fkeys=Object.keys(this.freqMap);
        let frep=fkeys[0];
        let keys=this.freqMap[frep];
        delete this.map[keys.shift()];
        if(this.freqMap[frep].length===0) delete this.freqMap[frep];
      }
      // 频率记录是否存在
      if (!this.freqMap[1]) this.freqMap[1] = [];
      // 插入新值
      this.freqMap[1].push(key);
      this.map[key]={
        value:value,
        frep:1;
      }
    }else{
      obj.value=value;
      this.update(key,obj);
    }
  }
}



function Cache(key, value) {
  this.key = key;
  this.value = value;
}
 
function LFU() {
  this.localCache = [];
  this.maxLength = 5;
}
 
LFU.prototype.getCache = function(key) {
  for (var i = 0;i < this.localCache.length; i++) {
    if (this.localCache[i].key === key) {
      var count = ++this.localCache[i].count;
      console.log('count:', count);
      var result = this.localCache[i];
      this.localCache.sort((a, b) => {return  b.count - a.count});
      return result;
    }
  }
  return null;
}
 
LFU.prototype.setCache = function(cache) {
  if (this.localCache.length === this.maxLength) {
    this.localCache.pop();
  }
 
  Object.assign(cache, {count: 0});
 
  this.localCache.push(cache);
}





