/**
 * @param {number[]} prices
 * @return {number}
 */
{
    var maxProfit = function (prices) {
        let dp = new Array(prices.length).fill(new Array(2).fill(0));
        dp[0][0] = 0; //第一天不持股的最大总收益
        dp[0][1] = -prices[0]; //第一天持股的最大总收益

        for (let i = 1; i < prices.length; ++i) {
            dp[i][0] = Math.max(dp[i - 1][1] + prices[i], dp[i - 1][0]);//第i天不持股的最大总收益，两种情况：1.到该天持股并卖出股票的收益。 2.到达该天之前已经卖出股票（故不持股的收益）。（两者取最大值）
            dp[i][1] = Math.max(-prices[i], dp[i - 1][1]); //第i天持股的最大总收益，两种情况：1.该天才购入股票的总收益 2.倒达该天前已经购入股票并没有卖出的总收益
        }
        //到最后一天为止卖出股票的最大收益
        return dp[prices.length - 1][0];
    };
}
{
    var maxProfit = function (prices) {
        let ans = 0;
        let minPrice = prices[0];
        for (const p of prices) {

            ans = Math.max(ans, p - minPrice);
            minPrice = Math.min(minPrice, p);

        }
        return ans;
    };

}