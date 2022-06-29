
/**
 * 给定一个二叉树的根节点 root ，和一个整数 targetSum ，
 * 求该二叉树里节点值之和等于 targetSum 的 路径 的数目。

路径 不需要从根节点开始，也不需要在叶子节点结束，但是路径方向必须是向下的（只能从父节点到子节点）

链接：https://leetcode.cn/problems/path-sum-iii

*/
function pathSum(root, sum) {
    if (!root) return 0;
    let ret = 0;
    const dfs = (root, total) => {
        if (root == null) return 0;
        let count = 0;
        total += root.val;
        if (total === sum) {
            count++;
        }
        if (root.left) {
            count += dfs(root.left, total);
        }
        if (root.right) {
            count += dfs(root.right, total);
        }
        return count;
    }
    ret = dfs(root, 0);
    ret += pathSum(root.left, sum);
    ret += pathSum(root.right, sum);
    return ret;
}