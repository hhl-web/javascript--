//   按照访问左子树——根节点——右子树的方式遍历这棵树：中序遍历
const inorderTraversal1 =function(root){
    const stack =[];
    const result =[];

    while(stack.length || root){
        if(root){
            stack.push(root);
            root = root.left;
        }else{
            const node=stack.pop();
            result.push(node.val);
            root = node.right;
        }
    }
    return result
}

const bt = require('./bt');

console.log(inorderTraversal1(bt))


function inorderTraversal2(root){
    const result =[];

    const x =(root)=>{
        if(!root) return;
        let q = root;
        const stack =[];
        while(stack.length || q){
            while(q){
                stack.push(q);
                q= q.left;
            }

            const node = stack.pop();
            result.push(n.val);
            q = q.right;
        }
    }
    x(root);
    return result;
}