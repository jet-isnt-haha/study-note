/**
 * @param {number[]} nums
 * @return {number[]}
 */
var sortArray = function (nums) {
    quickSort(nums, 0, nums.length - 1);
    return nums;
};
function quickSort(nums, start, end) {
    if (start >= end) {
        return;
    }
    const mid = partition(nums, start, end);
    quickSort(nums, start, mid - 1);
    quickSort(nums, mid + 1, end);
}
function partition(nums, start, end) {
    const pivot = nums[start];
    let left = start + 1;
    let right = end;
    while (left < right) {
        while (left < right && nums[left] <= pivot) {
            left++;
        }
        while (left < right && nums[right] >= pivot) {
            right--;
        }
        if (left < right) {
            [nums[left], nums[right]] = [nums[right], nums[left]];
            left++;
            right--;
        }
    }
    if (left === right && nums[right] > pivot) {
        right--;
    }
    if (right !== start) {
        [nums[start], nums[right]] = [nums[right], nums[start]];
    }
    return right;
}

