/**
 * @param {number[]} nums
 * @return {number}
 */
var firstMissingPositive = function (nums) {
    let n = nums.length;
    for (let i = 0; i < nums.length; ++i) {

        while (nums[i] >= 1 && nums[i] <= n && nums[i] !== nums[nums[i] - 1]) {
            const j = nums[i] - 1;
            [nums[j], nums[i]] = [nums[i], nums[j]];
        }
    }

    for (let i = 0; i < nums.length; ++i) {
        if (nums[i] !== i + 1) {
            return i + 1;
        }
    }
    return n + 1;
};