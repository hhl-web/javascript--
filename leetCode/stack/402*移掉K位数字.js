
/**
 * 
给你一个以字符串表示的非负整数 num 和一个整数 k ，
移除这个数中的 k 位数字，使得剩下的数字最小。请你以字符串形式返回这个最小的数字。
https://leetcode.cn/problems/remove-k-digits/
 */
var removeKdigits = function (num, k) {
    if (num.length <= k) return '0';

    let stack = num.split('');
    let idx = 0;
    while (k--) {
        while (stack[idx] <= stack[idx + 1]) idx++;
        stack.splice(idx, 1);
        idx = idx > 0 ? idx - 1 : 0
    }
    let t = 0;
    while (stack[t] === '0') t++;
    return stack.slice(t).join('') || '0'
};

console.log(removeKdigits(num = "5337", k = 2))
console.log(removeKdigits(num = "1432219", k = 3))
//   console.log(removeKdigits(num = "111111", k = 3))