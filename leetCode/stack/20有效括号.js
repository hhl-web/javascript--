/**
 * 给定一个只包括 '('，')'，'{'，'}'，'['，']' 的字符串 s ，判断字符串是否有效。
 有效字符串需满足：
 左括号必须用相同类型的右括号闭合。
 左括号必须以正确的顺序闭合。
 链接：https://leetcode-cn.com/problems/valid-parentheses
 */


var isValid = function(s) {
    // 关闭符号对应 的映射
    const map ={
        ')':'(',
        '}':'{',
        ']':'['
    }
    let stack =[];

    for(let i = 0;i<s.length;i++){
        const key =s[i];
        const isClose = map[key];
        if(isClose){
            let last = stack[stack.length-1];
            if(last === isClose){
                stack.pop()
            }else{
                return false;
            }
        }else{
            stack.push(key);
        }
    }
    return true;
};

console.log(isValid("]")) ;
console.log(isValid("({{[{}]}})")) //true