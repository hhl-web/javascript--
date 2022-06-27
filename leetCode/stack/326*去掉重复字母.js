/*
 给你一个字符串 s ，请你去除字符串中重复的字母，使得每个字母只出现一次。需保证 返回结果的字典序最小（要求不能打乱其他字符的相对位置）。
 https://leetcode.cn/problems/remove-duplicate-letters/
 */


const removeDuplicateLetters = (s) => {
    const stack = [];
    for (let i = 0; i < s.length; i++) {
        if (stack.length === 0) {
            stack.push(s[i]);
            continue;
        }
        const len = stack.length;
        if (stack.indexOf(s[i]) < 0) {
            if (s[i].charCodeAt - stack[len - 1].charCodeAt() > 0) {
                stack.push(s[i]);
            } else {
                const lastS = s.slice(i + 1);
                for (let j = len - 1; j >= 0; j--) {
                    if (s[i].charCodeAt() - stack[j].charCodeAt() <= 0) {
                        if(lastS.indexOf(stack[j])>=0){
                            stack.pop();
                            if(stack.length === 0){
                                stack.push(s[i]);
                            }
                        }else{
                            stack.push(s[i]);
                            break;
                        }
                    }else{
                        stack.push(s[i]);
                        break
                    }
                }
            }
        }
    }
    return stack.join('');
}
console.log(removeDuplicateLetters(s = "cbacdcbc"))