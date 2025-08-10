/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var subarraySum = function (nums, k) {
    let newMap = new Map();

    let s = 0;
    let ans = 0;

    newMap.set(s, 1);

    for (const num of nums) {
        s += num;
        ans += newMap.get(s - k) ?? 0;
        newMap.set(s, (newMap.get(s) ?? 0) + 1);
    }
    return ans;
};

