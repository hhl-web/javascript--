



/**
 * @param {number[]} coins
 * @param {number} amount
 * @return {number}
 */
var coinChange = function (coins, amount) {
    const memo = new Array(amount + 1).fill(-666);
    const dp = (coins, amount) => {
        if (amount === 0) return 0;
        if (amount < 0) return -1;
        if (memo[amount] !== -666) return memo[amount];
        let res = Infinity;
        for (let coin of coins) {
            const subProblem = dp(coins, amount - coin);
            if (subProblem === -1) {
                continue;
            }
            res = Math.min(res, subProblem + 1);
        }
        memo[amount] = res === Infinity ? -1 : res;
        return memo[amount];
    }
    return dp(coins, amount);
};



const coinChange = (coins, amount) => {
    if (!amount) {
        return 0;
    }
    let dp = Array(amount + 1).fill(Infinity);
    dp[0] = 0;

    for (let i = 0; i < coins.length; i++) {
        for (let j = coins[i]; j <= amount; j++) {
            dp[j] = Math.min(dp[j - coins[i]] + 1, dp[j]);
        }
    }
    return dp[amount] === Infinity ? -1 : dp[amount];
}

/**
 * 输入: coins = [1, 2, 5], amount = 11
输出: 3 
解释: 11 = 5 + 5 + 1
 */