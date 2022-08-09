// 「平衡」要求它是一棵空树或它的左右两个子树的高度差的绝对值不超过 1

let isBalanced = function(root){
    let result = true;
    const dfs =(root) =>{
        if(!root) return 0;
        let left = dfs(root.left);
        let right = dfs(root.right);
        if(Math.abs(left-right)>1){
            return result =false;
        }
        return Math.max(left,right)+1;
    }
    dfs(root);
    return result;
}