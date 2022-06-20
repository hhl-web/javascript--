// 给定一个可包含重复数字的序列 nums ，按任意顺序 返回所有不重复的全排列。
const permuteUnique = (nums) => {
    const res = [];
    const used = new Array(nums.length);
    nums.sort((a, b) => a - b); // 升序排序

    const helper = (path) => {
        if (path.length == nums.length) { 
            res.push(path.slice());       
            return;
        }

        for (let i = 0; i < nums.length; i++) { // 枚举出所有的选择
            if (used[i]) {                      // 这个数使用过了，跳过。
                continue;
            }
            if (i - 1 >= 0 && nums[i - 1] == nums[i] && !used[i - 1]) { // 避免产生重复的排列
                continue;
            }
            path.push(nums[i]); // make a choice
            used[i] = true;     // 记录路径上做过的选择
            helper(path);       // explore，基于它继续选，递归
            path.pop();         // undo the choice
            used[i] = false;    // 也要撤销一下对它的记录
        }
    };

    helper([]);
    return res;
};