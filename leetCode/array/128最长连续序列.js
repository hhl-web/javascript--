// 给定一个未排序的整数数组 nums ，找出数字连续的最长序列（不要求序列元素在原数组中连续）的长度。

const longestConsecutive = function (nums) {
    if (nums.length === 0) return 0;
    const set = new Set(nums);
    const n = nums.length;
    let globalLongest = 1;
    for (let i = 0; i < n; i++) {
        if (!set.has(nums[i] - 1)) {
            let longest = 1;
            let currentMinNum = nums[i];
            while (set.has(currentMinNum + 1)) {
                currentMinNum += 1;
                longest++
            }
            globalLongest = Math.max(globalLongest, longest)
        }
    }
    return globalLongest;
}

const nums = [0,1,0,3,2,3];

console.log(longestConsecutive(nums))