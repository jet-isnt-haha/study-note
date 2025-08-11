/**
 * @param {number[]} nums
 * @return {number[]}
 */
var productExceptSelf = function (nums) {
    const pre = new Array(nums.length);
    const suf = new Array(nums.length);

    pre[0] = 1;
    for (let i = 1; i < nums.length; ++i) {
        pre[i] = pre[i - 1] * nums[i - 1];
    }

    suf[nums.length - 1] = 1;
    for (let i = nums.length - 2; i >= 0; --i) {
        suf[i] = suf[i + 1] * nums[i + 1];
    }

    const ans = new Array(nums.length);
    for (let i = 0; i < nums.length; ++i) {
        ans[i] = pre[i] * suf[i];
    }
    return ans
};