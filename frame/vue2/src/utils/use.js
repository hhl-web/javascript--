

// use就是将插件按照执行  传入Vue

export function initUse(Vue){
    plugin.install =function(Vue,options,a,b,c){};
    plugin =function (Vue,options,a,b,c){};

    Vue.use(plugin,options,a,b,c);

    Vue.use =function(plugin){
        const installedPlugin = this._installPlugins || (this._installPlugins =[]);
        if(installedPlugin.indexOf(plugin) >-1){
            return this;
        }
        const args =toArray(arguments, 1);
        args.unshift(this);
        if(typeof plugin.install === 'function'){
            plugin.install.apply(plugin,args)
        }else if(typeof plugin ==='function'){
            plugin.apply(null,args)
        }
        installedPlugin.push(plugin)
        return this;
    }
}