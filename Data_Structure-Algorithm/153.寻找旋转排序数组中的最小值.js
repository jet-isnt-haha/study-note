/**
 * @param {number[]} nums
 * @return {number}
 */
var findMin = function (nums) {
    let left = -1;
    let right = nums.length - 1;

    while (left + 1 < right) {
        let mid = (left + right) / 2 >>> 0;

        if (nums[mid] > nums[nums.length - 1]) {
            left = mid;
        } else {
            right = mid;
        }

    }

    return nums[right];
};