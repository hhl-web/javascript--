/*
给你一个包含 n 个整数的数组 nums，判断 nums 中是否存在三个元素 a，b，c ，使得 a + b + c = 0 ？请你找出所有和为 0 且不重复的三元组。

注意：答案中不可以包含重复的三元组。
输入：nums = [-1,0,1,2,-1,-4]
输出：[[-1,-1,2],[-1,0,1]]

链接：https://leetcode-cn.com/problems/3sum
 */

const threeSum = function (nums) {
    let result = [];
    let setList = new Set();
    for (let i = 0; i < nums.length - 2; i++) {
        let hash = {};
        const twoSumTarget = 0 - nums[i];
        for (let j = i + 1; j < nums.length; j++) {
            let key = twoSumTarget - nums[j];
            if (hash[key] !== undefined) {
                const arr = [nums[i], nums[j], nums[hash[key]]].sort((a, b) => a - b);
                const arrToString = String(arr);
                if (!setList.has(arrToString)) {
                    result.push(arr);
                    setList.add(arrToString)
                }
            }
            hash[nums[j]] = j;
        }
    }
    return result;
}