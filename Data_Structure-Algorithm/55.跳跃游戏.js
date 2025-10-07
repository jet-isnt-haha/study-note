/**
 * @param {number[]} nums
 * @return {boolean}
 */
var canJump = function (nums) {
    for (let i = 0; i < nums.length;) {
        if (i + nums[i] >= nums.length - 1) {
            return true;
        }
        let bestChoice = i;
        for (let j = i + 1; j <= nums[i] + i; ++j) {
            bestChoice = j + nums[j] > bestChoice + nums[bestChoice] ? j : bestChoice;
        }
        if (i === bestChoice) {
            return false;
        }
        i = bestChoice;
    }
    return false;
};
