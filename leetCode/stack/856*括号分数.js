/*
给定一个平衡括号字符串 S，按下述规则计算该字符串的分数：

() 得 1 分。
AB 得 A + B 分，其中 A 和 B 是平衡括号字符串。
(A) 得 2 * A 分，其中 A 是平衡括号字符串。

链接：https://leetcode-cn.com/problems/score-of-parentheses

构建一个栈
如果遇到(就往栈里面添加
如果遇到)就去寻找最近的左括号抵消，同时计算里面的分数

[(]                # 遇到 ( 往栈添加
[(, (]             # 继续添加
[(, 1]             # 遇到 ） 合成一个1
[(, 1, (]          # 遇到 ( 往栈添加
[(, 1, (, (]       # 继续添加
[(, 1, (, 1]       # 遇到 ） 合成一个1
[(, 1, 2]          # 遇到 ） ，结构就是（1）， 所以计算的话是 1 * 2
[6]                # 遇到 ） ，结构是（1，2）， 所以计算的话是 （1 + 2） * 2

 */

let scoreOfParentheses = (S) => {
  let stack = [];
  for (let i = 0; i < S.length; i++) {
    if (S[i] === '(') {
      stack.push('(');
    }
      if (S[i] === ')') {
        if (stack[stack.length - 1] === '(') {
          stack.pop();
          stack.push(1);
        } else {
          let temp = 0;
          let a = stack.pop()
          while (a !== '(') {
            temp += a;
            a = stack.pop();
          }
          stack.push(2 * temp);
        }
      }

  }
  let sum =0;
  stack.forEach((v)=>sum+=v);
  return sum;
}

console.log(scoreOfParentheses('(()(()))'))