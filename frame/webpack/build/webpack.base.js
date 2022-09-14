const path = require("path");
const dev = require("./webpack.dev");
const prod = require("./webpack.prod");
const merge = require("webpack-merge");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = env => {
    let isDev = env.development;
    const base = {
        entry:'./src/index.js',
        output: {
          filename: "[name].js",
          path: path.resolve(__dirname, "../dist")
        },
        module:{
            rules: [
                {
                  test: /\.css$/,
                  use: [
                    !isDev && MiniCssExtractPlugin.loader,
                    isDev && 'style-loader',
                    // 在css文件中可能会使用`@import`语法引用`css`文件,被引用的`css`文件中可能还会导入`scss`
                    // {
                    //     loader:'css-loader',
                    //     options:{
                    //         importLoader:1  // 引入的文件需要调用sass-loader来处理 
                    //     }
                    // },
                    // 使用`postcss-loader`增加样式前缀 
                    {
                        loader:'postcss-loader',
                        options:{
                            plugins:[require('autoprefixer')]
                        }
                    },
                    "postcss-loader",
                    "sass-laoder"
                  ].filter(Boolean)
                },
                // 转化成base64 使用`url-loader`将满足条件的图片转化成base64,不满足条件的`url-loader`会自动调用`file-loader`来进行处理
                {
                    test:/\.jpe?g|png|gif/,
                    use:{
                        loader:'url-loader',
                        options:{
                            limit:100*1024,
                            name:`img/[name].[ext]`
                        }
                    }
                },
                // 二进制文件也是使用`file-loader`来打包
                {
                    test:/woff|ttf|eot|svg|otf/,
                    use:{
                        loader:'file-loader'
                    }
                }
            ]
      
        },
        plugins:[
            !isDev && new MiniCssExtractPlugin({
              filename: "css/[name].[contentHash].css"
            }),
            new HtmlWebpackPlugin({
              filename: "index.html",
              template: path.resolve(__dirname, "../public/template.html"),
              hash: true,
              minify: {
                removeAttributeQuotes: true
              }
            }),
          ].filter(Boolean)
      };

    if (isDev) {
        return merge(base, dev);
    } else {
        return merge(base, prod);
    }
};