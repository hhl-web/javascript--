function longestPalindrome(s) {
    let res = '';
    let dp = [];
    let len = s.length;
    for (let i = 0; i < len; i++) {
        dp[i] = [];
        for (let j = 0; j < len; j++) {
            dp[i][j] = 0;
        }
    }
    console.log(dp)
    for (let i = len - 1; i >= 0; i--) {
        for (let j = i; j < len; j++) {
            //dp[i][j]表示子串i～j是否是回文子串
            //回文子串必须满足s[i]，s[j]相等。并且向里扩展一个字符也相等，即dp[i+1][j-1]也是回文子串
            //j - i < 2表示子串小于等于1也是回文串
            dp[i][j] = s[i] == s[j] && (j - i < 2 || dp[i + 1][j - 1]);
            if(dp[i][j] && j-i+1>res.length){
                res=s.substring(i,j+1)
            }
        }
    }
    return res;
}

console.log(longestPalindrome('cbbd'))