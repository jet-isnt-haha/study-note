/**
 * @param {number} target
 * @param {number[]} nums
 * @return {number}
 */

//法一
var minSubArrayLen = function (target, nums) {
    let len = Number.MAX_SAFE_INTEGER;
    let sum = 0;
    let startIndex = 0;
    for (let i = startIndex; i < nums.length; ++i) {
        sum += nums[i]
        if (sum < target) {
            continue;
        } else if (sum >= target) {
            len = Math.min(len, i - startIndex + 1);
            sum = 0;
            i = startIndex++;
        }
    }
    if (len === Number.MAX_SAFE_INTEGER) return 0;
    return len;

};


//法二
var minSubArrayLen = function (target, nums) {
    let left = 0,
        sum = 0;
    let minLength = Number.MAX_VALUE;
    for (let right = 0; right < nums.length; right++) {
        // 由于数组中的所有数字都是正整数，因此在子数组中添加新的数字能得到更大的子数组之和
        sum += nums[right];
        // sum>=target 已经是找到了可行解了
        while (left <= right && sum >= target) {
            //  移动左边界，在可行解里面寻找最优解
            minLength = Math.min(minLength, right - left + 1);
            sum -= nums[left++];
        }
    }
    return minLength == Number.MAX_VALUE ? 0 : minLength;
};

minSubArrayLen(7, [2, 3, 1, 2, 4, 3])