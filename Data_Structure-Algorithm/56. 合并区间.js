/**
 * @param {number[][]} intervals
 * @return {number[][]}
 */
var merge = function (intervals) {
    intervals.sort((a, b) => {
        if (a[0] !== b[0]) { return a[0] - b[0]; } else {
            return a[1] - b[1];
        }
    });
    const ans = [];
    let currLeft = intervals[0][0];
    let currRight = intervals[0][1];
    for (let i = 1; i < intervals.length; ++i) {
        if (intervals[i][0] > currRight) {
            ans.push([currLeft, currRight]);
            currLeft = intervals[i][0];
            currRight = intervals[i][1];

        } else {
            currLeft = Math.min(currLeft, intervals[i][0]);
            currRight = Math.max(currRight, intervals[i][1]);
        }
        if (i === intervals.length - 1) {
            ans.push([currLeft, currRight])
        }
    }
    return ans.length ? ans : [[currLeft, currRight]];
};