/**
 * @param {number} n
 * @return {number}
 */
var numSquares = function (n) {
    const dp = new Array(n + 1).fill(Infinity);
    dp[0] = 0;

    for (let i = 1; i <= n; ++i) {
        for (let j = 1; j * j <= i; ++j) {
            dp[i] = Math.min(dp[i], dp[i - j * j] + 1);
        }
    }
    return dp[n];
};

{
    var numSquares = function (n) {
        let i = 0;
        for (; (i + 1) * (i + 1) <= n; ++i);

        let numSquares = [];
        for (let x = 1; x <= i; ++x) {
            numSquares.push(x * x);
        }

        const dp = new Array(n + 1).fill(Infinity);
        dp[0] = 0;

        for (let i = 0; i < numSquares.length; ++i) {
            for (let j = numSquares[i]; j <= n; ++j) {
                dp[j] = Math.min(dp[j - numSquares[i]] + 1, dp[j]);
            }
        }
        return dp[n];
    };

}