/**
 * @param {number[]} nums
 * @return {number}
 */
var maxSubArray = function (nums) {
    let dp = new Array(nums.length).fill(0);
    dp[0] = nums[0]
    let max = dp[0];
    for (let i = 1; i < nums.length; ++i) {
        dp[i] = Math.max(dp[i - 1] + nums[i], nums[i]);
        max = Math.max(max, dp[i]);
    }
    return max
};
