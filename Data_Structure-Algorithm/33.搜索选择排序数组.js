/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var search = function (nums, target) {
    let left = -1;
    let right = nums.length - 1;
    let index = 0;
    while (left + 1 < right) {
        let mid = (left + right) / 2 >>> 0;
        if (nums[mid] > nums[nums.length - 1]) {
            left = mid;
        } else {
            right = mid;
        }
    }
    index = right;
    if (index > 0 && nums[0] <= target) {
        left = -1; right = index - 1;
    } else {
        left = index - 1; right = nums.length - 1;
    }
    while (left + 1 < right) {
        let mid = (left + right) / 2 >>> 0;
        if (nums[mid] < target) {
            left = mid;
        } else {
            right = mid;
        }
    }
    return nums[right] === target ? right : -1;
};

search([1], 1)