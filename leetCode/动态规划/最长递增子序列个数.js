function findNumberOfLIS(nums){
    let len = nums.length;
    let  dp =Array(len).fill(1); //以nums[i]结尾的最长上升子序列的长度
    let count =Array(len).fill(1);  //以nums[i]结尾的最长上升子序列个数
    let res =0;
    for(let i =0;i<len;i++){
        for(let j=0;j<i;j++){
            if(nums[i]>nums[j]){
                if(dp[j]+1 >dp[i]){
                    dp[i] = dp[j]+1 ;
                    count[i] = count[j];
                }else if(dp[j]+1 === dp[i]){
                    count[i]+=count[j];
                }
            }
        }
    }
    let max = Math.max(...dp);
    for(let i = 0;i<len;i++){
        if(dp[i] ===max){
            res+=count[i]   //统计最长子序列出现的次数并且返回
        }
    }
    return res;
}

const nums =[1,3,5,4,7];
console.log(findNumberOfLIS(nums))