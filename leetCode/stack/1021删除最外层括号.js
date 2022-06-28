/**
 * 有效括号字符串为空 ("")、"(" + A + ")" 或 A + B，其中 A 和 B 都是有效的括号字符串，+ 代表字符串的连接。例如，""，"()"，"(())()" 和 "(()(()))" 都是有效的括号字符串。

 如果有效字符串 S 非空，且不存在将其拆分为 S = A+B 的方法，我们称其为原语（primitive），其中 A 和 B 都是非空有效括号字符串。

 给出一个非空有效字符串 S，考虑将其进行原语化分解，使得：S = P_1 + P_2 + ... + P_k，其中 P_i 是有效括号字符串原语。

 对 S 进行原语化分解，删除分解中每个原语字符串的最外层括号，返回 S 。

 链接：https://leetcode-cn.com/problems/remove-outermost-parentheses


 输入：
    输出："()()()"
    解释：s = "(()())(())";
    输入字符串为 "(()())(())"，原语化分解得到 "(()())" + "(())"，
    删除每个部分中的最外层括号后得到 "()()" + "()" = "()()()"。
 */


const removeOuterParentheses = function (s) {
    let stack = [];
    let res = '';
    let countL = 0;
    let countR = 0;
    for (let i = 0; i < s.length; i++) {
        if (s[i] === '(') {
            stack.push('(')
        }
        if (s[i] === ')') {
            if (stack.length === 1 && countL === countR) {
                stack.pop();
                continue;
            }
            while (stack.length) {
                if (stack.length === 1) break;
                let t = stack.pop();
                countL++;
                res += t
            }
            res += s[i];
            countR++;
        }
    }
    return res;
};

const s1 = "(()())(())(()(()))";
const s2 = '((()())(()()))'



console.log(removeOuterParentheses(s2))