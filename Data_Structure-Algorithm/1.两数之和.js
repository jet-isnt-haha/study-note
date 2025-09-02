/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function (nums, target) {
    const preNums = []

    for (let i = 0; i < nums.length; ++i) {
        let curNum = nums[i];
        let targetNum = target - curNum;
        let targetIndex = preNums[targetNum];
        if (targetIndex !== undefined) {
            return [targetIndex, i];
        }
        preNums[curNum] = i;
    }

};