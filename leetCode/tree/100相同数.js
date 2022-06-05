// 深度优先搜索
const isSameTree =(p,q)=>{
    if(!q && !p) return true;
    if(q && p && q.val === p.val && isSameTree(p.left,q.left) && isSameTree(p.right,q.right)){
        return true;
    }
    return false;
}