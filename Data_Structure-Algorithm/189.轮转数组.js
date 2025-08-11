/**
 * @param {number[]} nums
 * @param {number} k
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var rotate = function (nums, k) {
    function reverse(i, j) {
        while (i < j) {
            [nums[i], nums[j]] = [nums[j], nums[i]];
            i++;
            j--;
        }
    }
    const n = nums.length;
    const K = k % nums.length;
    reverse(0, n - 1);
    reverse(0, K - 1);
    reverse(K, n - 1);

};