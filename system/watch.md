

- 监控平台的价值，抓住别人的兴趣、引起别人的好奇，让别人知道平台能给业务带来什么。


- 监控平台组成，监控维度，它的特色，域名配置 生成appID

- 场景:
    - 对于特殊且重要的业务场景自定义埋点监控，以便追溯问题
        价格中心模块，通过批量导入价格生成报表，检测不同城市区域价格是否合理，然后提交最终的价格直接影响到app的商品价格。这种重要的业务如果出现问题，通过埋点监控可以追溯哪个环节出现问题
        - 用户是否发起check价格是否合理的请求 & 提交不同城市区域的价格链路入参跟踪
                - 未修正不合理价格，未check就提交
                - 修正之后的价格可能还是不合理，未check就提交
    - SKU创建过程中要填写将近100多个的SKU属性，商品物料系统设计分为6大步骤:
        - 填写基础信息
        - 填写SCM信息
        - 填写图文描述
        - 设置交易属性
        - 设置授权范围
        - 设置存货门店
    每个步骤表单填写花费多长时间？对创建SKU每个步骤进行埋点，来评估业务部门的工作效率，以及分析是否可有优化的点。
   
    - 因为用户的电脑配置和产研不一致，所以会导致体验上的差别。比如大数据列表渲染 内存占用率的情况，页面是否白屏 、卡顿。通过监控可以感知用户体验，分析开发的功能模块是否存在性能问题。（页面性能，用户行为、使用设备情况）

    - 在特殊场景下捕获错误，研发可以快速定位问题，对代码细节的把控从而使得系统更健壮、更稳定。

- 我负责的是什么

    - 开发SDK
    - 接口梳理，接口开发，技术选型
    - 可视化管理系统的开发

- 我是怎么做
    - SDK的开发：
        - 设计SDK的大体架构（订阅发布模式设计SDK）；
        - 梳理哪些数据需要被收集，对数据进行分类；
        - 确定上报方式、上报时机；
    - node服务
        - 技术选型 eggJS + mongoose + redis
        - 整理好每个模块数据库模型
        - 梳理各个模块的接口定义，开发接口
    - 可视化管理系统的开发

- 关键结果
    - 监控系统上线之后，大概一个多月之后：
      - 优化了类目模块中的前端分类列表数据渲染速度、内存占用率。 1-1.5s
      - SKU创建过程耗时，每个步骤全部填写完大概平均时间是 30分钟-35分钟之间浮动，比较费时耗精力。现在是15-20分钟;（业务累积到一定程度属性和属性值必然会变多）
        我找了产品进行沟通，一起去找业务对齐；梳理哪些SKU属性可以抽离出枚举值并且可能会频繁发生变动的，然后我在SKU创建过程中，保持能选的就不填的原则去优化每个步骤；
      - 不同城市和区域能批量操作的话，也提供批量相关的功能
        比如确定SKU的前端分类属性，之前只能挂到一个城市区域里，优化之后一次操作可操作多个城市区域
      - 价格中心和存货管理这种重要业务场景，通过自定义埋点之后，可以排查到哪个链路出现问题
      - 系统的每天生成的错误数量在降低，现在平均一天3-4个错误，之前是8个
      - 现公司有18个toB系统在使用这个监控平台

- 后续的规划
    - 可视化管理系统提供配置邮箱模块，根据配置发送邮件
    - 对错误信息分等级
    - SDK提供录制，node服务提供接口录制回放

- 叮咚自己的监控平台 特点是什么？
    - 根据不同的业务场景自定义埋点，通过数据去分析这些业务场景是否有存在的必要性 以及 问题复盘
    - 在使用这个监控平台的过程中，文档详细 ，接入学习0成本