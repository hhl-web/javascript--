/**
 * 
 * @param {*} str 
 *  输入: s = "abcabcbb"
    输出: 3 
    解释: 因为无重复字符的最长子串是 "abc"，所以其长度为 3。
 */
const lengthOfLongestSubstring = (str) => {
    let res = [];
    let temp = [];
    for (let i = 0; i < str.length; i++) {
        const idx = temp.indexOf(str[i]);
        if (idx == -1) {
            // 找不到
            temp.push(str[i]);
            if (i === str.length - 1 && temp.length > res.length) {
                res = [...temp];
            }
        } else {
            // 找的到
            if (temp.length > res.length) {
                res = [...temp];
            }
            temp.splice(0, idx + 1);
            temp.push(str[i]);
        }
    }
    return res;
}

console.log(lengthOfLongestSubstring('abcabcbb'))