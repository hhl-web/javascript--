/**
 * 二叉搜索树的特性：
    左孩子比父节点小，右孩子比父节点大
 */
function kthSmallest(root, k) {
    const result = [];
    const stack = [];

    while (stack.length || root) {
        if (root) {
            stack.push(root);
            root = root.left
        } else {
            const n = stack.pop();
            result.push(n.val);
            root = n.right;
        }
    }
    return result[k-1];
}