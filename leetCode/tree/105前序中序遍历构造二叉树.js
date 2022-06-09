// 前序遍历的特点是， 根节点 始终出现在数组的第一位，而中序遍历中 根节点 出现在数组的中间位置。
// 前序遍历的顺序是 根| 左|右
function buildTree(preorder, inorder) {
    const helper = (p_start, p_end, i_start, i_end) => {
        if (p_start > p_end) return null;
        let rootValue = preorder[p_start];
        let root = new TreeNode(rootValue);
        let mid = inorder.indexOf(rootValue);
        let leftNum = mid - i_start;
        root.left = helper(p_start + 1, p_start + leftNum, i_start, mid - 1);
        root.right = helper(p_start + leftNum + 1, p_end, mid + 1, i_end);
        return root;
    }
    return helper(0, preorder.length - 1, 0, inorder.length - 1)
}