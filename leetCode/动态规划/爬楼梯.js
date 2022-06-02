/**
 *  输入：n = 3
    输出：3
    解释：有三种方法可以爬到楼顶。
    1. 1 阶 + 1 阶 + 1 阶
    2. 1 阶 + 2 阶
    3. 2 阶 + 1 阶
 */

function climbStairs1(n) {
    let dp = [];
    dp[0] = 1;
    dp[1] = 1;
    for (let i = 2; i <= n; i++) {
        dp[i] =dp[i-1] +dp[i-2];
    }
    return dp[n];
}


function climbStairs2(n) {
    if (n < 2) {
        return n;
    }
    let p = 1, q = 1, r = 1;
    for (let i = 2; i <= n; i++) {
        p = q;
        q = r;
        r = p + q;
    }
    return r;
}

console.log(climbStairs1(2))