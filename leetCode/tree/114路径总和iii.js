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