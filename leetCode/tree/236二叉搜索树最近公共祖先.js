/**
 * 
 * @param {*} root 
 * @param {*} p 
 * @param {*} q 
 * @returns 
 * 给定一个二叉搜索树, 找到该树中两个指定节点的最近公共祖先。
 */
let lowestCommonAncestor = (root, p, q) => {
    let broot = null;
    let dfs = (root) => {
        let count = 0;  //记录找到几个
        if (root.val == p.val || root.val == q.val) {
            count++;    //找到一个
        };

        if (!broot) {   //找不到父节点继续找 
            if (!broot && root.left) {
                count += dfs(root.left);
            }
            if (!broot && root.right) {
                count += dfs(root.right);
            }
            if (!broot && count === 2) {
                broot = root;   //递归是从叶子往上返回结果的，所以第一次找到的是最近的
            }
        }
        return count;
    }
    dfs(root);
    return broot
}