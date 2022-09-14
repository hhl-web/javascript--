const {
    Tapable,
    SyncHook,
    SyncSeriesHook,
    AsyncParallelHook
} =require('tapable')
const mkdirp = require("mkdirp");
const path = require("path");
const Compilation = require("./Compilation");
const Stats = require('./Stats');

class Compiler extends Tapable{
    constructor(context){
        super();
        // hooks就是钩子 很多钩子 在不同的时期触发
        this.hooks ={
            environment: new SyncHook([]),
            afterEnvironment: new SyncHook([]),
            // 插件执行完触发的钩子
            afterPlugins: new SyncHook([]),
            // 处理入口文件钩子
            entryOption: new SyncHook(["context", "entry"]),
            // 开始编译钩子
            make: new AsyncParallelHook(["compilation"]),
            beforeRun: new AsyncSeriesHook(["compiler"]),
            run: new AsyncSeriesHook(["compiler"]),
            beforeCompile: new AsyncSeriesHook(["params"]),
            compile: new SyncHook(["params"]),
            thisCompilation: new SyncHook(["compilation", "params"]),
            compilation: new SyncHook(["compilation", "params"]),
            afterCompile: new AsyncSeriesHook(["params"]),
            emit: new AsyncSeriesHook(["compilation"]),
            done: new AsyncSeriesHook(["stats"]) //一切完成之后会触发done这个钩子
        }
        this.options={};
        this.context = context;
    }
    emitAssets(compilation,callback){
        const emitFiles =err =>{
            let asstes =compilation.asstes;
            for(let file in asstes){
                let source =asstes[file];
                let targetPath= path.posix.join(this.options.output.path, file);
                this.outputFileSystem.writeFileSync(targetPath, source);
            }
            callback();
        }
        this.hooks.emit.callAsync(compilation, (err) => {
            mkdirp(this.options.output.path, emitFiles);
        });
    }
    // 开始执行
    run(finallCallback){
        const onCompiled =(err,compilation)=>{
            this.emitAssets(compilation,(err)=>{
                const stats =new Stats(compilation);
                this.hooks.done.callAsync(stats,err=>{
                    return finallCallback()
                })
            })
        }
        this.hooks.beforeRun.callAsync(this,err=>{
            this.hooks.run.callAsync(this,err=>{
                this.compile(onCompiled)
            })
        })
    }
    // 创建compilation实例 每一次编译都创建一次
    newCompilation(params) {
        let compilation = new Compilation(this);
        this.hooks.thisCompilation.call(compilation, params);
        this.hooks.compilation.call(compilation, params);
        return compilation;
      }
    // 编译
    compile(onCompiled){
        this.hooks.beforeCompile.callAsync({},err=>{
            this.hooks.compile.call();
            const compilation =this.newCompilation();
            this.hooks.make.callAsync(compilation,err=>{
                compilation.seal(err=>{
                    this.hooks.afterCompile.callAsync(compilation,err=>{
                        return onCompiled(null,compilation)
                    })
                })
            })
        })
    }
}
module.exports = Compiler;