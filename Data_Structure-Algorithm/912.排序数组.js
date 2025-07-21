/**
 * @param {number[]} nums
 * @return {number[]}
 */

//固定不变的pivot任意出现极端情况
//法一
var sortArray = function (nums) {
    if (nums.length === 0) return nums;

    let mideIndex = Math.floor(nums.length / 2);
    let midValue = nums.splice(mideIndex, 1)[0];

    let left = [];
    let right = [];

    for (let i = 0; i < nums.length; ++i) {
        if (nums[i] > midValue) {
            right.push(nums[i]);
        } else {
            left.push(nums[i]);
        }
    }

    return sortArray(left).concat([midValue], sortArray(right));
};


//法二 
//! 每次分区前加入随机元素降低极端情况出现的可能使其更好通过时间复杂度的测试。。。

/* 
如
!function partition(nums, start, end) {
 ! // 1. 随机选择pivot索引，并交换到start位置
 ! const pivotIndex = start + Math.floor(Math.random() * (end - start + 1)); // 包含end，确保范围正确
 ! [nums[start], nums[pivotIndex]] = [nums[pivotIndex], nums[start]];

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
    // 1. 随机选择pivot索引，并交换到start位置
    const pivotIndex = start + Math.floor(Math.random() * (end - start + 1)); // 包含end，确保范围正确
    [nums[start], nums[pivotIndex]] = [nums[pivotIndex], nums[start]];

    // 2. 此时pivot就是start位置的元素
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
