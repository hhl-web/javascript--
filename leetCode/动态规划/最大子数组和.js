/**
 * 最大子数组和，给你一个整数数组 nums 
 * 找出一个具有最大和的连续子数组（子数组最少包含一个元素），返回其最大和。
 */

function maxSubArray(nums){
    let dp=[];
    dp[0]=nums[0];
    for(let i=1;i<nums.length;i++){
        if(dp[i-1]<0){
            dp[i] = nums[i]
        }else{
            dp[i] = nums[i]+dp[i-1]
        }
    }
    return Math.max(...dp)
}


const nums = [-2,1,-3,4,-1,2,1,-5,4];

console.log(maxSubArray(nums))