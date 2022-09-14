## 8.配置TS环境
### 8.1 使用ts-loader
使用`ts`需要安装`ts`相关配置
```bash
npm install typescript ts-loader --save-dev
```

生成`ts`的配置文件
```bash
npx tsc --init
```

配置`ts-loader`
```javascript
{
    test:/\.tsx?/,
    use: ['ts-loader'],
    exclude: /node_modules/
}
```

将入口文件更改成`ts`文件

```javascript
let a:string = 'hello';
console.log(a);
```
执行`npm run dev`发现已经可以正常的解析`ts`文件啦！

### 8.2 使用 preset-typescript 
不需要借助`typescript`
```bash
npm install @babel/preset-typescript
```
在 .babelrc配
```json
{
    "presets": [
       ["@babel/preset-env",{
        "useBuiltIns":"usage",
        "corejs":2 
       }],
       "@babel/preset-react",
       ["@babel/preset-typescript",{
           "allExtensions": true  
       }]
    ],
    "plugins": [
        ["@babel/plugin-proposal-decorators", { "legacy": true }],
        ["@babel/plugin-proposal-class-properties",{"loose":true}],
        "@babel/plugin-transform-runtime"
    ]
}
```


## 10.配置ts+vue环境
安装`vue`所需要的模块
```
npm install vue-loader  vue-template-compiler --save-dev
npm install vue vue-property-decorator 
```

配置`ts-loader`
```javascript
{
    test: /\.tsx?/,
    use: {
        loader:'ts-loader',
        options: {
            appendTsSuffixTo: [/\.vue$/],
        }, 
    },
    exclude: /node_modules/
}
```

使用`vue-loader`插件
```javascript
const VueLoaderPlugin = require('vue-loader/lib/plugin');
new VueLoaderPlugin();
```

配置解析`.vue`文件
```javascript
{
    test:/\.vue$/,
    use:'vue-loader'
}
```

增加`vue-shims.d.ts`，可以识别`.vue`文件
```
declare module '*.vue' {
    import Vue from 'vue';
    export default Vue;
}
```

`index.tsx`文件
```javascript
import Vue from 'vue';
import App from './App.vue';
let vm = new Vue({
    render:h=>h(App)
}).$mount('#root')
```

`App.vue文件`
```html



##