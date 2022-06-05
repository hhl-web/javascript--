// 左子树的左侧与右子树右侧，左子树右侧与右子树左侧  对称树
// 深度搜索
const isCheck = (p, q) => {
    if (!p && !q) return true;
    if (!p || !q) return false;
    return p.val === q.val && isCheck(p.left, q.right) && isCheck(p.right, q.left);
}
function isSymmetric1(root) {
    isCheck(root, root)
}

// 栈的思想
var isSymmetric2 = function(root) {
    //迭代方法判断是否是对称二叉树
    //首先判断root是否为空
    if(root===null){
        return true;
    }
    let stack=[];
    stack.push(root.left);
    stack.push(root.right);
    while(stack.length){
        let rightNode=stack.pop();//左节点
        let leftNode=stack.pop();//右节点
        if(leftNode===null&&rightNode===null){
            continue;
        }
        if(leftNode===null||rightNode===null||leftNode.val!==rightNode.val){
            return false;
        }
        // 栈顺序很重要
        stack.push(leftNode.left);//左节点左孩子入队
        stack.push(rightNode.right);//右节点右孩子入队
        stack.push(leftNode.right);//左节点右孩子入队
        stack.push(rightNode.left);//右节点左孩子入队
    }
    return true;
  };
