/*
给定一个字符串，请你找出其中不含有重复字符的 最长子串 的长度。

示例 1:

输入: s = "abcabcbb"
输出: 3
解释: 因为无重复字符的最长子串是 "abc"，所以其长度为 3。
*/


let lengthOfLongestSubstring = function (s) {
    if (s.length <= 1) return s.length;
    let result = [];
    let temp = [];
    for (let i = 0; i < s.length; i++) {
        let index = temp.indexOf(s[i]);
        if (index === -1) {
            temp.push(s[i]);
            if (i === s.length - 1 && temp.length > result.length) {
                result = [...temp]
            }
        } else {
            if (temp.length > result.length) {
                result = [...temp];
            }
            temp.splice(0, index + 1);
            temp.push(s[i]);
        }
    }
    return result.length;
}

console.log(lengthOfLongestSubstring('abcabcbb'))