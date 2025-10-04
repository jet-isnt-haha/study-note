/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
//桶排序
var topKFrequent = function (nums, k) {
    let map = new Map();
    for (const num of nums) {
        map.set(num, (map.get(num) || 0) + 1);
    }
    const maxCount = Math.max(...map.values());

    const bucket = Array.from({ length: maxCount + 1 }, () => []);
    for (const [value, count] of map.entries()) {
        bucket[count].push(value);
    }
    const ans = [];
    for (let i = maxCount; i >= 0 && ans.length < k; i--) {
        ans.push(...bucket[i]);
    }
    return ans;

};