/**
 * @param {number} numRows
 * @return {number[][]}
 */
var generate = function (numRows) {
    const dp = new Array(numRows);
    dp[0] = [1];
    dp[1] = [1, 1];
    for (let i = 2; i < numRows; ++i) {
        dp[i] = new Array(i + 1).fill(1);
        for (let j = 1; j < i; ++j) {
            dp[i][j] = dp[i - 1][j - 1] + dp[i - 1][j];
        }
    }

    return numRows === 1 ? [[1]] : dp;
};