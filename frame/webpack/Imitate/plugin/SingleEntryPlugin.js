class SingleEntryPlugin{
    constructor(context,entry,name){
        this.context=context;
        this.entry =entry;
        this.name= name;
    }
    apply(compiler){
        // 注册 SingleEntryPlugin 插件
        compiler.hooks.make.tapAsync('SingleEntryPlugin',(compilation,callback)=>{
            let {context,entry,name}=this;
            compilation.addEntry(context,entry,name,callback);
        })
    }
}