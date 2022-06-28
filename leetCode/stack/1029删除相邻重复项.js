/**
 * 给你一个字符串 s，「k 倍重复项删除操作」将会从 s 中选择 k 个相邻且相等的字母，并删除它们，使被删去的字符串的左侧和右侧连在一起。

 你需要对 s 重复进行无限次这样的删除操作，直到无法继续为止。

 在执行完所有删除操作后，返回最终得到的字符串。

 链接：https://leetcode-cn.com/problems/remove-all-adjacent-duplicates-in-string-ii


 输入：s = "deeedbbcccbdaa", k = 3
输出："aa"
解释： 
先删除 "eee" 和 "ccc"，得到 "ddbbbdaa"
再删除 "bbb"，得到 "dddaa"
最后删除 "ddd"，得到 "aa"


输入：s = "abcd", k = 2
输出："abcd"
解释：没有要删除的内容。

来源：力扣（LeetCode）
链接：https://leetcode.cn/problems/remove-all-adjacent-duplicates-in-string-ii
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。

 */
const removeDuplicates =function(s,k){
    const stack =[];
    for(let i =0 ;i<s.length;i++){
        const val = s[i];
        const len = stack.length;

        if(len>0 && val === stack[len-1].val){
            stack[len-1].count++;
            if(stack[len-1].count === k){
                stack.pop()
            }
        }else{
            stack.push({val,count:1})
        }
    }
    console.log(stack);
    return stack.reduce((pre,cur)=>{
        return pre + cur.val.repeat(cur.count)
    },'')
}
console.log(removeDuplicates(s = "deeedbbcccbdaa", k = 3)) // aa
// const removeDuplicates = function (s, k) {
//     const map = new Map();
//     const helper = (k, map) => {
//         let str = '';
//         for (const [key, value] of map) {
//             if (value.count % k !== 0) {
//                 let t = value.count;
//                 let mapKey = Array.isArray(key) ? key[0] : key;
//                 while (t) {
//                     str += mapKey;
//                     map.delete(key);
//                     t--;
//                 }
//                 map.has(mapKey) ? map.set(mapKey, value.count + value.count) : map.set(mapKey, value.count)
//             } else {
//                 map.delete(key)
//             }
//         }
//         return str;
//     }

//     const next = (s, map) => {
//         for (let i = 0; i < s.length; i++) {
//             if (map.has(s[i])) {
//                 const item = map.get(s[i]);
//                 let idx = item.idx;
//                 let count = item.count;
//                 if (idx + 1 == i) {
//                     // 相邻
//                     count++;
//                     idx = i;
//                     map.set(s[i], { idx, count });
//                 } else {
//                     map.set([s[i], i], { idx: i, count: 1 })
//                 }
//             } else {
//                 map.set(s[i], { idx: i, count: 1 })
//             }
//         }
//         return map;
//     }
//     const task = (str, k) => {
//         let res = '';
//         next(str, map);
//         res = helper(k, map);

//         console.log(res, map)
//         return res;
//     }
//     return task(s, k);
// };