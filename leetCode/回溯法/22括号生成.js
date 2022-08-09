// 数字 n 代表生成括号的对数，请你设计一个函数，用于能够生成所有可能的并且 有效的 括号组合。
const isValid = (s) => {
    const stack = [];
    const map = {
        ')': '('
    }
    for (let i = 0; i < s.length; i++) {
        const key = s[i];
        const isClose = map[key];
        if (isClose) {
            if (stack[stack.length - 1] === isClose) {
                stack.pop();
            } else {
                return false;
            }
        } else {
            stack.push(key);
        }
    }
    return stack.length === 0;
}
// 把符号看成AB两个字母，求AB两个字段的排列，将排列的s进行是否是有效的括号判断
var generateParenthesis = function (n) {
    const res = []
    const generate = (path) => {
        if (path.length === n * 2) {
            if (isValid(path)) {
                res.push(path);
            }
            return;
        }
        ['(', ')'].forEach((v) => {
            generate(path + v)
        })
    };
    generate('');
    return res;
};

console.log(generateParenthesis(3))