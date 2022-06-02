/**
状态
f[i][j] 表示 s 的第 i 个字符到第 j 个字符组成的子串中，最长的回文序列长度是多少。
转移方程
如果 s 的第 i 个字符和第 j 个字符相同的话
f[i][j] = f[i + 1][j - 1] + 2
如果 s 的第 i 个字符和第 j 个字符不同的话
f[i][j] = max(f[i + 1][j], f[i][j - 1])
然后注意遍历顺序，i 从最后一个字符开始往前遍历，j 从 i + 1 开始往后遍历
这样可以保证每个子问题都已经算好了。
初始化
f[i][i] = 1 单个字符的最长回文序列是 1
 */
function longestPalindromeSubseq(s){
    let dp=[];
    for(let i= 0;i<s.length;i++){
        dp[i] =[];
        for(let j =0 ;j<s.length;j++){
            dp[i][j] =0;
        }
        dp[i][i] = 1;
    }
    for(let i=s.length-1;i>=0;i--){
        for(let j=i+1;j<s.length;j++){
            if(s[i]===s[j]){
                dp[i][j] = dp[i+1][j-1]+2;
            }else{
                dp[i][j] =Math.max(dp[i+1][j],dp[i][j-1])
            }
        }
    }
    return dp[0][s.length-1];
}


const s = "babad";
const res ='bab';
const ret=longestPalindromeSubseq(s);
console.log(ret)
