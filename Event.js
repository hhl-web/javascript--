class Event{
	constructor(){
        this._event=Object.create(null);		
        this.stackArr=null;		//订阅数组,用来存放先发布后订阅的数据
        this.stackArr && this.stackArr.forEach((fn,index)=>{
            fn();
            if(index===this.stackArr.length-1){
                this.stackArr=null;
            }
        });
    }
}
Event.prototype.on=function(key,fn){
    return (this._event[key] || this._event[key]=[]).push(fn);
}
Event.prototype.emit=function(key,payload){
    this._event[key] && this._event[key].forEach(fn=>{
        fn.call(fn,payload);
    })
    //用一个新函数包裹自定义的emit函数
    let fn=()=>this.emit.call(this,key,payload);
    if(!this._event[key] && !this.stackArr){
        this.stackArr=[];
        this.stackArr.push(fn);
    }
}
Event.prototype.off=function(key,callback){
    if(callback){
        return this._event[key]=this._event[key].filter(fn=>fn!=callback && callback!=fn.c);
    }
    this._event[key]=[];
}
Event.prototype.once=function(key,fn){
    const one=(payload)=>{
        fn.call(fn,payload);
        this.off(key,one);
    }
    one.c=fn;		
    this.on(key,one);		
}
Event.prototype.clearAllEvent=function(){
    Object.keys(this._event).forEach(key=>{
        this._event[key]=[];
    })
}
