// 中序遍历的顺序是每次遍历左孩子，再遍历根节点，最后遍历右孩子。
// 后序遍历的顺序是每次遍历左孩子，再遍历右孩子，最后遍历根节点。

function buildTree(inorder, postorder) {
    const helper = (p_start, p_end, i_start, i_end) => {
        if (p_start > p_end) return null;
        let rootValue = postorder[p_end];
        let root = new TreeNode(rootValue);
        let mid = inorder.indexOf(rootValue);
        let leftNum = i_end - mid;
        root.left = helper(p_start, p_end - leftNum - 1, i_start, mid - 1);
        root.right = helper(p_end - leftNum, p_end - 1, mid + 1, i_end)
    }
    return helper(0, postorder.length - 1, 0, inorder.length - 1)
}
