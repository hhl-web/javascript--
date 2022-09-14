let EntryOptionPlugin=require('./plugin/EntryOptionPlugin');

class WebpackOptionsApply{
    process(options,compiler){
        compiler.hooks.afterPlugins.call(compiler);
        new EntryOptionPlugin().apply(compiler);
        compiler.hooks.entryOption.call(options.context,options.entry)
    }
}