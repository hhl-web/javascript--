// 给你一棵 完全二叉树 的根节点 root ，求出该树的节点个数。
var countNodes = function(root) {
    let count =0;
    if(!root) return count;

    const dfs =(root)=>{
        count++;
        if(root.left) dfs(root.left);
        if(root.right) dfs(root.right);
    }
    dfs(root);
    return count;
};