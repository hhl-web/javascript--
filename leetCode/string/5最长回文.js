const longestPalindrome = (str) => {
    let dp = [];
    let res = '';
    for (let i = 0; i < str.length; i++) {
        dp[i] = [];
        for (let j = 0; j < str.length; j++) {
            dp[i][j] = 0
        }
    }
    for (let i = str.length - 1; i >= 0; i--) {
        for (let j = i; j < str.length; j++) {
            dp[i][j] = str[i] === str[j] && (j - i < 2 || dp[i + 1][j - 1]);
            if (dp[i][j] && res.length < j - i + 1) {
                res = str.substring(i,j+1);
            }
        }
    }
    return res;
}