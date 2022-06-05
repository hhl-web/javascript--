

function postorderTraversal(root){
    const result =[];
    if(!root) return;
    const stack =[root];
    const outputStack = []
    while(stack.length){
        const node = stack.pop();
        outputStack.push(node);
        if(node.left) stack.push(node.left);
        if(node.right) stack.push(node.right);
    }
    while(outputStack.length){
        const node =outputStack.pop();
        result.push(node.val);
    }
    return result;
}