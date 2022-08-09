const xx =(nums,)=>{
    let result =[];
    const dfs =(path,...xx)=>{
        // 最终条件判断
        if(path.length === nums.length){
            result.push(path);
            return;
        }

        nums.forEach(v=>{
            if(path.includes(v)) return ;
            dfs(path.concat(v))
        })
    }
    dfs([])
}