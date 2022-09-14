const OptimizeCssAssetsPlugin = require('optimize-css-assets-plugin');
const TerserWebpackPlugin =require('terser-webpack-plugin');
const {CleanWebpackPlugin} =require('clean-webpack-plugin');

module.exports={
    mode:'production',
    optimization:{
        minimizer:[
            new OptimizeCSSAssetsPlugin(),
            new TerserWebpackPlugin()
        ]
    },
    plugins:[
        new CleanWebpackPlugin()
    ]
}