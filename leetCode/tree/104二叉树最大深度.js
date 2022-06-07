// 二叉树的深度为根节点到最远叶子节点的最长路径上的节点数。
function maxDepth1(root){
    let maxL =0;
    const dfs =(n,l)=>{
        if(!n) return
        if(!n.right && !n.left){
            maxL =Math.max(maxL,l);
        }
        dfs(n.left,l+1);
        dfs(n.right,l+1)
    }
    dfs(root,1);
    return maxL;
}

function maxDepth2(root){
    if(!root) return 0;
    let result =0;
    const q=[root];
    while(q.length){
        let len = q.length;
        while(len--){
            const n =q.shift();
            if(n?.left) q.push(n.left);
            if(n?.right) q.push(n.right);
        }
        result+=1;
    }
    return result;
}