// 根-左子树-右子树
function preorderTraversal(root){
    if(!root) return [];
    const stack =[root];
    const result =[];
    while(stack.length){
        const node =stack.pop();
        result.push(node.val);
        if(node.right) stack.push(node.right);
        if(node.left) stack.push(node.left);
       
    }
    return result;
}