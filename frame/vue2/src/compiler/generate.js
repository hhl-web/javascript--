const defaultTagRE = /\{\{((?:.|\r?\n)+?)\}\}/g; // {{aaaaa}}


// html字符串 =》 字符串  _c('div',{id:'app',a:1},'hello')

function genProps(attrs){    //[{name:'xxx',value:'xxx'},{name:'xxx',value:'xxx'}]
  let str='';
  for(let i=0;i<attrs.length;i++){
    let attr=attrs[i];
    if(attr.name==='style'){ // color:red;background:blue
        let styleObj = {};
        attr.value.replace(/([^;:]+)\:([^;:]+)/g, function() {
            styleObj[arguments[1]] = arguments[2]
        })
        attr.value = styleObj;
    }
    str += `${attr.name}:${JSON.stringify(attr.value)},`;
  }
  return `{${str.slice(0,-1)}}`;
}

function gen(el){
  if(el.type===1){
    return generate(el);
  }else{
    let text=el.text;
    if(!defaultTagRE.text(text)){
      return `_v('${text}')`;
    }else{
      let tokens=[];
      let match,lastIndex = defaultTagRE.lastIndex = 0;
      while(match = defaultTagRE.exec(text)){  //单个字符串不停的匹配
        let index=match.index;
        if(index>lastIndex){
          tokens.push(JSON.stringify(text.slice(lastIndex, index)));
        }
        tokens.push(`_s(${match[1].trim()})`); // JSON.stringify()
        lastIndex = index + match[0].length;
      }
      if (lastIndex < text.length) {
        tokens.push(JSON.stringify(text.slice(lastIndex)))
       }
      return `_v(${tokens.join('+')})`
    }
  }
}

function genChildren(el){
  let children = el.children;
  if(children){
    children.map(c=>gen(c)).join(',');
  }
  return false;
}
export function generate(el){
  let children=genChildren(el);
  let code = `_c('${el.tag}',${el.attrs.length? genProps(el.attrs): 'undefined'}${children? `,${children}`:''})`;
  return code;
}