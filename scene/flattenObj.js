/**
 * 对象扁平化
 * 说明：请实现 flatten(input) 函数，input 为一个 javascript 对象（Object 或者 Array），返回值为扁平化后的结果。
 * 示例：
 *   var input = {
 *     a: 1,
 *     b: [ 1, 2, { c: true }, [ 3 ] ],
 *     d: { e: 2, f: 3 },
 *     g: null,
 *   }
 *   var output = flatten(input);
 *   output如下
 *   {
 *     "a": 1,
 *     "b[0]": 1,
 *     "b[1]": 2,
 *     "b[2].c": true,
 *     "b[3][0]": 3,
 *     "d.e": 2,
 *     "d.f": 3,
 *     // "g": null,  值为null或者undefined，丢弃
 *  }
 */
// 递归
function flattenObj(input) {
    if (typeof input !== 'object' || input === null) return;
    const soucrce = Array.isArray(input) ? [...input] : { ...input };
    const result = {};
    function noop(soucrce, parentKey = '') {
        for (const key in soucrce) {
            let itemKey = ''
            if (Array.isArray(soucrce)) {
                itemKey = parentKey ? `${parentKey}[${key}]` : key;
            } else {
                itemKey = parentKey ? `${parentKey}.${key}` : key;
            }
            if (typeof soucrce[key] === 'object' && soucrce[key] !== null) {
                noop(soucrce[key], itemKey);
            } else {
                if (!parentKey) {
                    soucrce[key] ? result[key] = soucrce[key] : ''
                } else {
                    soucrce[key] ? result[`${itemKey}`] = soucrce[key] : ''
                }
            }
        }
    }
    noop(soucrce);
    return result;
}

function flattenObj2(input) {
    if (typeof input !== 'object' || input === null) return;
    const stack = [input];
    const stackKey = [''];
    const result = {};
    while (stack.length) {
        const item = stack.shift();
        const itemKey = stackKey.shift();
        for (const key in item) {
            const val = Array.isArray(item) ? `${itemKey}[${key}]` : itemKey ? `${itemKey}.${key}` : key;
            if (typeof item[key] === 'object') {
                stack.push(item[key]);
                stackKey.push(val)
            } else {
                result[val] = item[key];
            }
        }
    }
    return result;
}

var input = {
    a: 1,
    b: [1, 2, { c: true }, [3]],
    d: { e: 2, f: 3 },
    g: null,
}
var output = flattenObj2(input);
console.log(output, '-----')
// 广度遍历

