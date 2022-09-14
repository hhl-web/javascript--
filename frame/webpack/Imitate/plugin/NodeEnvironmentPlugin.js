let fs=require('fs');
class NodeEnvironmentPlugin{
    apply(compiler){
        compiler.inputFileSystem=fs;
        compiler.outFileSystem=fs;
    }
}

module.exports= NodeEnvironmentPlugin;