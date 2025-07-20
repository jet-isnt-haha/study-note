/**
 * @param {number[]} nums
 * @return {number}
 */
var lengthOfLIS = function (nums) {
    let ans = 0;
    if (nums.length < 2) return nums.length;
    let dp = new Array(nums.length).fill(1);
    for (let i = 1; i < nums.length; ++i) {
        ans = Math.max(ans, dfs(i));
    }

    function dfs(i) {
        let tmp = 1;
        for (let j = 0; j < i; ++j) {
            if (nums[j] < nums[i]) {
                tmp = Math.max(tmp, dp[j] + 1);
            }
        }
        dp[i] = tmp;
        return tmp;
    }
    return ans
};
console.log(lengthOfLIS([10, 9, 2, 5, 3, 7, 101, 18]));