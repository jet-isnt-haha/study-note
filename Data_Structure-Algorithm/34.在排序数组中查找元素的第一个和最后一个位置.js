/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
function lowerBound(nums, target) {
    let left = 0;
    let right = nums.length - 1;

    while (left <= right) {
        let mid = ((left + right)) / 2 >>> 0;
        if (nums[mid] >= target) {
            right = mid - 1;
        } else {
            left = mid + 1;
        }
    }
    return left;
}
var searchRange = function (nums, target) {
    const start = lowerBound(nums, target);
    if (start === nums.length || nums[start] !== target)
        return [-1, -1];


    const end = lowerBound(nums, target + 1) - 1;
    return [start, end];

};