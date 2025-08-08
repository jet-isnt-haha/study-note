/**
 * @param {number[]} height
 * @return {number}
 */
var trap = function (height) {
    let ans = 0, left = 0, preMax = 0, sufMax = 0;
    let right = height.length - 1;

    while (left < right) {
        preMax = Math.max(preMax, height[left])
        sufMax = Math.max(sufMax, height[right])

        if (preMax < sufMax) {
            ans += preMax - height[left++];
        } else {
            ans += sufMax - height[right--];
        }
    }
    return ans;

};

trap([0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1])