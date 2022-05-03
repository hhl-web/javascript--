let images=['https://github.com///blob/master/ProImages/ImgPreloading01.jpg?raw=true',
'https://github.com///blob/master/ProImages/ImgPreloading02.jpg?raw=true',
'https://github.com///blob/master/ProImages/ImgPreloading03.jpg?raw=true',
'https://github.com///blob/master/ProImages/ImgPreloading04.jpg?raw=true',
'https://github.com///blob/master/ProImages/ImgPreloading05.jpg?raw=true',
'https://github.com///blob/master/ProImages/ImgPreloading06.jpg?raw=true',
'https://github.com///blob/master/ProImages/ImgPreloading07.jpg?raw=true',
'https://github.com///blob/master/ProImages/ImgPreloading08.jpg?raw=true',
'https://github.com///blob/master/ProImages/ImgPreloading09.jpg?raw=true',
'https://github.com//blob/master/ProImages/ImgPreloading10.jpg?raw=true'];
class PreLoad{
  constructor(option){
    this._default={
      order:'unordered',  //是否是有序加载还是无序加载
      each:null,  //针对有序：每加载一次执行的函数
      all:null    //所以都加载之后执行的函数
    };
    this.imgDatas = Array.isArray(option.imgDatas)?option.imgDatas:[option.imgDatas];
    this.opts=Object.assign(this._default,option.opts);
    this.init()
  }
  init(){
    if(this._default.order === 'unordered'){
      this._unordered()
    }else{
      this._ordered()
    }
  }
  _ordered(){
    let count=0;
    const load=()=>{
      const img =new Image();
      img.src = this.imgDatas[count];
      img.onload=()=>{
        this.opts.each && this.opts.each(count);
        if(count<this.imgDatas.length){
          count ++;
          load();
        }else{
          this.opts.all && this.opts.all(count);
        }
      }
    }
    load();
  }
  _unordered(){
    let count= 0;
    for(let i=0;i<this.imgDatas.length;i++){
      const imgs= new Image();
      imgs[i].src= this.imgDatas[i];
      imgs.onload=()=>{
        count++;
        if(count === this.imgDatas.length){
          this.opts.all && this.opts.all(count);
        }
      }
    }
  }
}
