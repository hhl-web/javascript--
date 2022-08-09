// 给定一个 没有重复 数字的序列，返回其所有可能的全排列。

const permute=(arr)=>{
    const use ={};
    const ret =[]
    const dfs = (path)=>{
        if(path.length === arr.length){
            return ret.push(path)
        }
        for(let  i =0 ;i<arr.length;i++){
            const val = arr[i];
            if(use[val]) continue;
            use[val] =true;
            path.push(val);
            dfs(path.slice(0));
            use[val] =false;
            path.pop();
        }
    }
    dfs([]);
    return ret;
}
console.log(permute([1,2,3]));
