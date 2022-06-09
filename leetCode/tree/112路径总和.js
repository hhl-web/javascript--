// 深度优先搜索 递归 要找到结束递归的条件
/**
 * 判断该树中是否存在 根节点到叶子节点 的路径，这条路径上所有节点值相加等于目标和 targetSum
 * 如果存在，返回 true ；否则，返回 false 。
 * @param {*} root 
 * @param {*} targetNum 
 * @returns 
 */
function hasPathSum(root, targetNum) {
    if (!root) return false;
    let result = false;
    const dfs = (root, value) => {
        if (!root.left && root.right && value === targetNum) {
            return result = true;
        }
        if (root.left) dfs(root.left, value + root.left.val);
        if (root.right) dfs(root.right, value + root.right.val)
    }
    dfs(root, root.val)
    return result
}