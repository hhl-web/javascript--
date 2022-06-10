function searchBST(root, val) {
    let result =null;
    const dfs = (root) => {
        if (!root) return null;
        if (root.val === val) {
            result = root;
        };
        if (root.left) dfs(root.left);
        if (root.right) dfs(root.right);
    }
    dfs(root);
    return result;
}


var searchBST = function(root, val) {
    if (root == null) return null;
    if (root.val === val) return root;
    if (root.val > val) {
      return searchBST(root.left, val);
    } else if (root.val < val) {
      return searchBST(root.right, val);
    }
  };
  