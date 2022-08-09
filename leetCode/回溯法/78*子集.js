let subset = (nums) => {
    let result = []

    const dfs = (path,l,start) => {
        if(path.length ===l){
            result.push(path);
            return;
        }
        for (let i = start; i < nums.length; i++) {
            dfs(path.concat(nums[i]),l,i+1);
        }
    }
  for(let i = 0;i<nums.length;i++){
    dfs([],i,0)
  }
    return result
}


console.log(subset([1, 2, 3]));