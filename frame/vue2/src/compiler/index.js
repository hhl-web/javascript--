import { generate } from './generate';
import {parserHTML} from './parser';

export function compilerToFunction(template){
  let root=parserHTML(template);  //词法解析 =》 生成ast树  
  let code=generate(root);      //将ast语法树生成代码块（字符）
  let render=new Function(`with(this){return ${code}}`);  //模板引擎 由with + new Function组成
  return render;
}
/* 
ast语法树和vdom是不一样的
ast 只能描述语法 语法不存在的属性无法描述。（html，css,js）都有ast语法树
vdom是一个对象，是用来描述dom结构 ，但可新增其他属性。
*/
