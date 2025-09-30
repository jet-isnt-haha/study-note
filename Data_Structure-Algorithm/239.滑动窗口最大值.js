/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
var maxSlidingWindow = function (nums, k) {
    const ans = [];
    let max = nums[0];
    let maxIndex = 0;
    for (let i = 1; i < k; ++i) {
        if (nums[i] > max) {
            max = nums[i];
            maxIndex = i;
        }
    }
    ans.push(max);

    let left = 1;
    let right = k;
    while (right < nums.length) {
        if (nums[right] >= max) {
            max = nums[right]
            ans.push(max);
            maxIndex = right;
        } else if (left > maxIndex) {
            max = nums[left];
            maxIndex = left;
            for (let i = left + 1; i < k + left; ++i) {
                if (nums[i] >= max) {
                    max = nums[i];
                    maxIndex = i;
                }
            }
            ans.push(max);
        } else {
            ans.push(max);
        }
        right++;
        left++;
    }
    return ans;
};
