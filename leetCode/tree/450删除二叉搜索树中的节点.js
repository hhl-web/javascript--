/**
 * 递归三部曲：
 * 确定递归函数参数以及返回值
 * 确定终止条件
 * 确定单层递归的逻辑 
 */
/**
 * 二叉搜索树的特性：
 * 左子树的所有节点的值均小于当前节点的值
 * 右子树的所有节点的值均大于当前节点的值
 * 左子树和右子树均为二叉搜索树
 */
const deleteNode = function (root, key) {
    if (!root) return root;
    let getMin = (node) => {
        while (node.left) {
            node = node.left
        }
        return node;
    }
    if (root.val === key) {
        if (root.left == null) return root.right;
        if (root.right == null) return root.left;
        let minNode = getMin(root.right);
        root.val = minNode.val;
        root.right = deleteNode(root.right, minNode.val);
    } else if (root.val < key) {
        root.right = deleteNode(root.right, key);
    } else {
        root.left = deleteNode(root.left, key)
    }
    return root;
}