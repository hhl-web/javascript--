let NodeEnviromentPlugin = require('./plugin/NodeEnvironmentPlugin');
let Compiler = require('./Compiler');
let WebpackOptionsApply = require('./WebpackOptionsApply');


function webpack(options) {
    options.context = options.context || process.cwd();
    // 创建一个 compiler 对象
    let compiler = new Compiler(options.context);
    compiler.options = options;
    // 设置node环境 读写用哪个模块
    new NodeEnviromentPlugin().apply(compiler);
    // 执行所以配置的插件
    if (options.plugins && Array.isArray(options.plugins)) {
        options.plugins.forEach((plugin) => plugin.apply(compiler));
    }
    compiler.hooks.environment.call();  //触发environment事件执行
    compiler.hooks.afterEnvironment.call(); //afterEnvironment事件执行
    // 加载各种内置插件主要逻辑集中在 WebpackOptionsApply 类
    new WebpackOptionsApply().process(options, compiler);
    compiler.run();
    return compiler

}
