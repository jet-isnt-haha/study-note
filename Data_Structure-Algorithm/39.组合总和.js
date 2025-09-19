/**
 * @param {number[]} candidates
 * @param {number} target
 * @return {number[][]}
 */
var combinationSum = function (candidates, target) {

    const ans = [];
    const subRes = [];
    let sum = 0;
    let map = new Map();
    function backTracking() {
        if (sum === target) {
            const key = subRes.slice().sort().toString();
            if (!map.has(key)) {
                ans.push(subRes.slice());
                map.set(key, 1)
            }
            return;
        } else if (sum > target) {
            return;
        }

        for (let i = 0; i < candidates.length; ++i) {
            subRes.push(candidates[i]);
            sum += candidates[i];
            backTracking()
            sum -= subRes.pop()
        }
    }
    backTracking();
    return ans;
};

combinationSum([2], 1)