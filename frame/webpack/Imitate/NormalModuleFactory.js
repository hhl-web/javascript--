/*
 * @Author: your name
 * @Date: 2021-10-14 19:27:28
 * @LastEditTime: 2021-10-14 19:28:30
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: /works/zf-study/webpack/Imitate/NormalModuleFactory.js
 */
const path = require('path');
const NormalModule = require('./NormalModule');
class NormalModuleFactory{
    create(data){
        return new NormalModule(data);
    }
}

module.exports = new NormalModuleFactory();