/*
 * @Author: your name
 * @Date: 2021-10-14 14:36:34
 * @LastEditTime: 2021-10-14 15:15:42
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /works/zf-study/webpack/Imitate/Stats.js
 */

class Stats{
    constructor(compilation){
        this.files = compilation.files;
        this.modules = compilation.modules;
        this.chunks = compilation.chunks;
    }
}
module.exports = Stats;