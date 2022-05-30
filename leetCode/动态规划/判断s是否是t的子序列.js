/**
 * 判断子序列，给定字符串 s 和 t ，判断 s 是否为 t 的子序列。
 */
// 双指针
function isSubsequence1(subStr,str){
    let subIdx =0;
    let idx =0;
    while(subIdx<subStr.length && idx<str.length){
        if(subStr[subIdx]===str[idx]) subIdx++;
        idx++;
    }
    return subIdx===subStr.length;
}

// console.log(isSubsequence1('abc','ahbgdc'))
// console.log(isSubsequence2('axc','ahbgdc'))

// 动态规划
function isSubsequence2(s,t){
    const [m,n] = [s.length,t.length];
    const dp=new Array(m+1).fill(0).map(x=>new Array(n+1).fill(0));
    for(let i=1;i<=m;i++){
        for(let j=1;j<=n;j++){
            if(s[i-1]===t[j-1]){
                dp[i][j] =dp[i-1][j-1]+1;
            }else{
                dp[i][j] =dp[i][j-1];
            }
        }
    }
    return dp[m][n] === m ;
}

console.log(isSubsequence2('axc','ahbgdc'));
console.log(isSubsequence2('abc','ahbgdc'))