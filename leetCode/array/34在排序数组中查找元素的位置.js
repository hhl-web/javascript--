let searchRange =function(nums,target){
    let result =[-1,-1];
    for(let i = 0;i<nums.length;i++){
        if(nums[i]===target){
            let start =i;
            let end =i;
            while((nums[end+1] || nums[end+1]===target) && (nums[end]===nums[end+1])){
                end++
            }
            result = [start,end];
            break;
        }
    }
    return result;
}
console.log('result',searchRange([0,0,0,1,2,2,3], 0));