/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var threeSum = function (nums) {
    const res = [];
    const len = nums.length;
    if (len < 3) return [];

    nums.sort((a, b) => a - b);
    for (let i = 0; i < len - 2; ++i) {
        if (nums[i] === nums[i - 1]) continue;

        const target = -nums[i];
        let j = i + 1;
        let k = len - 1;
        while (j < k) {
            if (j > i + 1 && nums[j - 1] === nums[j]) {
                j++;
                continue;
            }

            if (nums[k] === nums[k + 1]) {
                k--;
                continue;
            }

            if (nums[k] + nums[j] === target) {

                res.push([nums[i], nums[j], nums[k]]);
                j++;
                k--;
            } else if (nums[k] + nums[j] > target) {
                k--;
            } else {
                j++;
            }

        }
    }
    return res;
}

console.log(threeSum([2, -3, 0, -2, -5, -5, -4, 1, 2, -2, 2, 0, 2, -4, 5, 5, -10]).join(','));
