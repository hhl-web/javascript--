function preorderTraversal(root){
    if(!root) return;
    const stack =[root];
    const result =[];
    while(stack.length){
        const node =stack.pop();
        result.push(node.val);
        if(node.left) stack.push(node.left);
        if(node.right) stack.push(node.right);
    }
    return result;
}