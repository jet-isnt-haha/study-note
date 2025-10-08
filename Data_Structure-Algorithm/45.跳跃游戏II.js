/**
 * @param {number[]} nums
 * @return {number}
 */
var jump = function (nums) {
    if (nums.length === 1) return 0;
    let count = 0;
    for (let i = 0; i < nums.length;) {
        if (i + nums[i] >= nums.length - 1) {

            return count + 1;
        }

        let bestChoice = i;

        for (let j = i + 1; j <= i + nums[i]; ++j) {
            bestChoice = j + nums[j] > bestChoice + nums[bestChoice] ? j : bestChoice;
        }

        i = bestChoice;
        count++;
    }
};