function longestCommonSubsequence(text1, text2) {
    let m = text1.length;
    let n = text2.length;
    let dp = []
    for (let i = -1; i < m; i++) {
        dp[i] = [];
        for (let j = -1; j < n; j++) {
            dp[i][j] = 0;
        }
    }
    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            if (text1[i] === text2[j]) {
                dp[i][j] = Math.max(dp[i][j], dp[i - 1][j - 1] + 1)
            } else {
                dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1])
            }
        }
    }
    return dp[m - 1][n - 1];
}


const text1 = "abcde", text2 = "ace";
console.log(longestCommonSubsequence(text1, text2))