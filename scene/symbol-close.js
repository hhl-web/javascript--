// 输入 '(' ')' '[' ']' '{'  '}' 组成的字符串 判断是否正确
// 输入 '()[{}]' true
// '({[}])' false
function test(str) {
   const map ={
       ')':'(',
       '}':'{',
       ']':'['
   }
   const stack =[];
   for(let i=0;i<str.length;i++){
       const item =str[i];
       const isClose= map[item];
       if(isClose){
        const last =stack[stack.length-1];  //最后一个
        if(last===isClose){
            stack.pop();
        }else{
            return false;
        }
       }else{
            // 入栈开始符
           stack.push(item)
       }
   }
   return true;
}

console.log(test('()[{}]'));

console.log(test('({[}])'));