const {getOptions,interpolateName} =require('loader-utils');
const fileLoader=require('file-loader');
const mime=require('mime');
function loader(content){
  let {filename='[name].[hash].[ext]',limit=1024*64} =getOptions(this) || {};
  if(content.length <limit){
    const contentType=mime.getType(this.resourcePath);  //返回此图片的内容类型
    let base64=`data:${contentType};base64,${content.toString('base64')}`;  //转化成base64
    return `module.exports=${base64}`;
  }
  return fileLoader.call(this.content);
}
loader.raw=true;
module.exports=loader;