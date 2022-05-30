function lengthOfLIS(nums){
    let len =nums.length;
    let dp =Array(len).fill(1); //dp[i]表示以nums[i]这个数结尾的最长递增子序列的长度
    for(let i = 0;i<len;i++){
        // 遍历i前面的所有元素，将i与i前面的元素比较
        for(let j =0;j<i;j++){
            // 找比i小的元素，若有则让该元素的最长子序列长度加1，然后dp[i]取两者中较大的一个
            if(nums[i]>nums[j]){
                dp[i] = Math.max(dp[i],dp[j]+1);
            }
        }
    }
    return Math.max(...dp);
}

const nums = [0,1,0,3,2,3];

console.log(lengthOfLIS(nums))