// function pathSum(root,targetNum){
//     // if(!root) return [];
//     const res= [];
//     const dfs =(root,value,nums)=>{
//         nums.push(root.val);
//         if(value === targetNum){
//             res.push(nums);
//         }
//         if(root.left) dfs(root.left,value + root.left.val,nums.slice());
//         if(root.right) dfs(root.right,value+root.right.val,nums.slice())
//     }
//     // dfs(root,root.val,[])
//     return root && dfs(root,root.val,[]) || res;
// }


/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * if 条件语句单分支执行
 * @param {TreeNode} root
 * @param {number} targetSum
 * @return {number[][]}
 */
 var pathSum = function(root, targetSum) {
    let res = []
    const dfs = (node, total, nums) => {
        total += node.val, nums.push(node.val)
        if (node.left || node.right) {
            node.left && dfs(node.left, total, nums.slice())
            node.right && dfs(node.right, total, nums.slice())
        }else if (total === targetSum) {
            res.push(nums)
        }
    }
    return root && dfs(root, 0, []) || res
};