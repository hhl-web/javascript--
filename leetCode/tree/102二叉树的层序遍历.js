
// 根据树的层级输出值:层序
function levelOrder(root) {
    let result = [];
    if (!root) return [];
    const q = [[root, 0]];
    while (q.length > 0) {
        const [x, level] = q.shift();
        if (!result[level]) {
            result.push([x.val]);
        } else {
            result[level].push(x.val);
        }
        if (x.left) q.push([x.left, level + 1]);
        if (x.right) q.push([x.right, level + 1]);
    }
    return result;
}