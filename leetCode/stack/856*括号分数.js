/*
给定一个平衡括号字符串 S，按下述规则计算该字符串的分数：

() 得 1 分。
AB 得 A + B 分，其中 A 和 B 是平衡括号字符串。
(A) 得 2 * A 分，其中 A 是平衡括号字符串。

链接：https://leetcode-cn.com/problems/score-of-parentheses
 */

var scoreOfParentheses = function(S) {

    const stack = []
    stack.push(0)
    for(let i =0;i<S.length; i++){
      const char = S[i]
  
      if(char === '(' ){
        stack.push(0)
      }else {
        let v = stack.pop()
        let w = stack.pop()
        stack.push(w+Math.max(2*v,1))
      }
    }
    return stack.pop()
  
  };
  
  console.log(scoreOfParentheses('(()(()))'))