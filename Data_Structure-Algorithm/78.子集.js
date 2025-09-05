/**
 * @param {number[]} nums
 * @return {number[][]}
 */

//! 转换成选与不选的问题
var subsets = function (nums) {
    const res = [];
    const subRes = [];
    function dfs(i) {
        if (i === nums.length) {
            res.push(subRes.slice());
        }

        dfs(i + 1);

        subRes.push(nums[i]);
        dfs(i + 1);

        subRes.pop();
    }
    dfs(0);
    return res;
};