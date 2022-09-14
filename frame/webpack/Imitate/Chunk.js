/*
 * @Author: your name
 * @Date: 2021-10-14 19:43:13
 * @LastEditTime: 2021-10-14 19:49:10
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /works/zf-study/webpack/Imitate/Chunk.js
 */
class Chunk{
    constructor(module){
        this.entryModule = module;  //转好之后的module
        this.name = module.name;    //打包之后的模块的文件名称
        this.files = [];
        this.modules = [];
    }
  }
  module.exports = Chunk;