// 最小深度是从根节点到最近叶子节点的最短路径上的节点数量。
// 广度优先搜索的性质保证了最先搜索到的叶子节点的深度一定最小。

function minDepth(root){
    if(!root) return 0;
    const q = [[root,1]];
    while(q.length){
        const [n,l] =q.shift();
        if(!n.left && !n.right){
            return l;
        }
        if(n.left){
            q.push([n.left,l+1])
        }
        if(n.right){
            q.push([n.right,l+1])
        }
    }
}
