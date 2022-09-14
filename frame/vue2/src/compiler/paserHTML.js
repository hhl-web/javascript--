const ncname = `[a-zA-Z_][\\-\\.0-9_a-zA-Z]*`; // 标签名 
const qnameCapture = `((?:${ncname}\\:)?${ncname})`; //  用来获取的标签名的 match后的索引为1的
const startTagOpen = new RegExp(`^<${qnameCapture}`); // 匹配开始标签的 
const endTag = new RegExp(`^<\\/${qnameCapture}[^>]*>`); // 匹配闭合标签的
//aa  =   "  xxx "  | '  xxxx '  | xxx
const attribute = /^\s*([^\s"'<>\/=]+)(?:\s*(=)\s*(?:"([^"]*)"+|'([^']*)'+|([^\s"'=<>`]+)))?/; // a=b  a="b"  a='b'
const startTagClose = /^\s*(\/?)>/; //     />   <div/>
const defaultTagRE = /\{\{((?:.|\r?\n)+?)\}\}/g; // {{aaaaa}}



export function parserHTML(html){

  let root=null;
  let stack=[];   //栈的思想（先进后出）去设计父子节点的关系 先进来的就是父节点

  function createAstElement(tagName,attrs){
    return {
      tag:tagName,
      type:1,
      children:[],
      parent:null,
      attrs,
    }
  }
  
  // 收集开始的标签
  function start(tagName,attrs){
    let parent=stack[stack.length-1];
    let element = createAstElement(tagName, attrs);
    if(!root){
      root=element;
    }
    if(parent){
      parent.children.push(element);
      element.parent=parent;
    }
    stack.push(element);
  }
  // 校验
  function end(tagName){
    let last=stack.pop();
    if(last.tag!==tagName) throw new Error('标签有误');
  }
  // 文本
  function chars(text){
    text = text.replace(/\s/g, "");
    let parent=stack[stack.length-1];
    if(text){
      parent.children.push({
        type:3,
        text
      })
    }
  }
  // 前进
  function advance(len){
    html=html.substring(len);
  }
  function parserStartTag(html){
    const start=html.match(startTagOpen);
    if(start){
      const match = {
        tagName: start[1],
        attrs: []
      }
      advance(start[0].len);
      let end,attr;
      while(!(end = html.match(startTagClose) && (attr = html.match(attribute))){
        match.attrs.push({ name: attr[1], value: attr[3] || attr[4] || attr[5] })
        advance(attr[0].length);
      }
      if(end){
        advance(end[0].length);
      }
      return match;
    }
    return false;
  }
  while(html){
    let textEnd=html.indexOf('<');
    if(textEnd===0){
      const startTagMatch = parserStartTag(html);
      if(startTagMatch){
        start(startTagMatch.tagName,startTagMatch.attrs);
        continue;
      }
      const endTagMatch=html.match(endTag);
      if(endTagMatch){
        end(endTagMatch[1]);
        advance(endTagMatch[0].length);
        continue;
      }
    }
    let text;
    if(textEnd>0){
      text=html.substring(0,textEnd);
    }
    if(text){
      chars(text);
      advance(text.length)
    }
  }
  return root;
}