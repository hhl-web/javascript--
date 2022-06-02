function rob(nums) {
    const len = nums.length;
    if (len === 0) return 0;
    const dp = [];
    dp[0] = nums[0];
    dp[1] = Math.max(nums[0], nums[1]);
    for (let i = 2; i < len; i++) {
        dp[i] = Math.max(dp[i - 1], dp[i - 2] + nums[i]);
    }
    return dp[len-1];
}

const nums = [2, 7, 9, 3, 1];
const res = 12;

console.log(rob(nums))