/**
 * @param {number[]} nums
 * @return {number}
 */
var findPeakElement = function (nums) {

    let left = -1;
    let right = nums.length - 1;
    while (left + 1 < right) {
        let mid = (left + right) / 2 >>> 0;
        if (nums[mid] > nums[mid + 1]) {
            right = mid;
        } else {
            left = mid;
        }

    }
    return right;
};