// 是层序遍历二叉树的变换 顺序，倒序
let zigzagLevelOrder = function(root) {
    if(!root) return [];
    const q = [[root,0]];
    const result =[];
    let flag =true;
    while(q.length){
        const [node,level] =q.shift();
        if(!result[level]){
            result.push([node.val]);
        }else{
            if(level%2===0){
               result[level].push(node.val)
            }else{
                result[level].unshift(node.val)
            }
        }
        if(node.left!== null)  q.push([node.left,level+1]);
        if(node.right!== null) q.push([node.right,level+1]);
    }
    return result;
};