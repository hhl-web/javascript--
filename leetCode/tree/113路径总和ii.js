
/**
 * if 条件语句单分支执行
 * @param {TreeNode} root
 * @param {number} targetSum
 * @return {number[][]}
 */
 var pathSum = function(root, targetSum) {
    let res = []
    const dfs = (node, total, nums) => {
        total += node.val, nums.push(node.val)
        if (node.left || node.right) {
            node.left && dfs(node.left, total, nums.slice())
            node.right && dfs(node.right, total, nums.slice())
        }else if (total === targetSum) {
            res.push(nums)
        }
    }
    return root && dfs(root, 0, []) || res
};