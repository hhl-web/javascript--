 
 ## 前端分类列表优化专项
    - 本次优化的目的是 将模型为树形结构 & 嵌套层级多，数据量大的数据在渲染的时候速度更快，减少页面卡顿，减少内存占用率。
    - 具体怎么解决
        - 分析后端返回来的数据
        - 之前的递归组件 vs 优化后的递归组件 
            - 分析之前的渲染方式
            - 现在使用按需加载方式，分析实现方式
            - 渲染时html的数量变少
            - 每行节点的单元格可配置
        - 解决白屏方式，自定义ui实现骨架屏加载
        - 其他自主优化，依据业务吐槽的痛点，提供模糊搜索实现快速定位一级分类

 ## webpack构建速度优化
- 构建速度
    - 通过resolve选项优化，减小查询的范围
        - alias
        - modules
        - mainFields
    - 优化loader的解析速度
        - cacheDirectory
        - noParse 忽略对部分没采用模块化的文件的递归解析处理 jquery，ChartJS
        - include
        - exclude
        - happyPack、thread-loader
    - hard-source-webpack-plugin构建缓存
    - 利用文件指纹缓存
        - contenthash  chunkhash hash 
    - 动态链接库 webpack.DllPlugin 和 webpack.DllReferencePlugin
    - 构建时剔除moment没用的包
    - 按需引入lodash模块
        - 使用 babel-plugin-lodash 和 lodash-webpack-plugin来打包lodash
- 构建优化
    - 压缩css ,css和js模块分开打包 optimize-css-assets-webpack-plugin 和 mini-css-extract-plugin 
    - 删除无用的css  purgecss-webpack-plugin
    - js并发压缩 terser-webpack-plugin开启js并发压缩
    - 提取公共代码和第三方库
    - 将打包后的图片进行压缩 通过image-webpack-loader
    - 路由懒加载 webpackChunkName字段，webpack配置output选项

 ## 文件命名规范 
    - 实现这个npm包的关键点在于：
        - 获取每次有变更的文件，将这些文件进行遍历校验
        - 在提交代码之前做校验，提供自定义命令 在bin目录下检测命令行process.argv是否有--check命令
 ## 图片加载优化
    https://juejin.cn/post/7103311752170831902#heading-23
    - 做这个事情是自主的，是在做上传文件SDK的时候，得知文件上传先到ddfs再到腾讯云，看了腾讯云有压缩的文档
    - 懒加载 ,el-image 的二次封装。lozadJs图片懒加载库
    - 使用webP压缩 ,腾讯云图片压缩后缀 imageMogr2/format/webp
 ## 动态路由
    - 公司的路由是在sso系统配的，然后随着系统模块的增多，需要对路由进行分组管理，
    - 之前的路由 vs 优化的路由
        - 可以兼容配置link外部连接的路由 和 iframe层的路由
        - 之前无法映射路由是在哪个父路由上，并且关系发生变化，需要改动前端代码，优化之后不需要
    （ 根据 sso配置的认证字符串，前端代码通过name进行匹配，需保证 route 和subRoute的name是唯一的）
 ## 用户版本提示
    - 收集版本号，打包构建时收集。webpack提供的钩子done
    - 获取最新的版本号和本地版本号对比 ，对比时机。
 ## 组件封装
    - 多级类目搜索面板设计的关键：
        - 在结构上设计成左右面板
        - 通过设置计算属性来决定右面板展示什么内容以及什么时候展示，计算属性的值依据左面板选中的值

 ## 遇到的问题

 - 在配置webpack的时候 版本号不一致
 - 使用sortableJs时绑定拖拽元素，一开始是将大的body作为容器绑定，这样子是无法同分类下不同层级无法拖拽的。
   通过分析 利用ref属性给每个节点node作为容器绑定

## 商品物料系统的整条链路把控

- App上商品数据就是从商品物料系统输出的

- 链路
    - 采购建档 （创建商品,需要审批，具体谁审批去流程中心配）-》审批中心-》生成一个正式的SKU

    - 商品库（创建商品） -》生成一个正式的SKU

    - 生成SKU之后，对SKU信息治理，内容运营