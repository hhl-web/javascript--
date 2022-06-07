// 自底向上的层序遍历
function levelOrderBottom(root){
    const result =[];
    const q=[root];
    while(q.length){
        let len = q.length;
        result.push([]);
        while(len--){
            const n =q.shift();
            result[result.length-1].push(n.val);
            if(n.left) q.push(n.left);
            if(n.right) q.push(n.right);
        }
    }
    return result.reverse();
}