// 利用reduce实现
// function flattening(arr) {
//     if (!Array.isArray(arr)) return;
//     return arr.reduce((a, b) => a.concat(Array.isArray(b) ? flattening(b) : b), []);
// }


function flattening(arr) {
    if (!Array.isArray(arr)) return null;
    const dfs = (data) => {
        if (!Array.isArray(arr)) return data;
        let idx = 0;
        let res = [];
        while (idx < data.length) {
            if (Array.isArray(data[idx])) {
                data[idx++].forEach(item => Array.isArray(item) ? res.push(...dfs(item)) : res.push(item));
            } else {
                res.push(data[idx++]);
            }
        }
        return res;
    }
    return dfs(arr)
}
let arr = [1, 2, 3, [2, 33, 4], 3, [35, 44, [67, 90, [3322]]]];
console.log(flattening(arr))