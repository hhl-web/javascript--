var invertTree = function(root) {
    const dfs =(root)=>{
        if(!root) return null;
        const left =dfs(root.left);
        const right =dfs(root.right);
        root.left = right;
        root.right = left;
        return root;
    }
    return dfs(root);
};