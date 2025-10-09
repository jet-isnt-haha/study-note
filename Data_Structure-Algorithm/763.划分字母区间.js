/**
 * @param {string} s
 * @return {number[]}
 */
var partitionLabels = function (s) {
    let last = Array(26);
    for (let i = 0; i < s.length; ++i) {
        last[s.charCodeAt(i) - 'a'.charCodeAt(0)] = i;
    }

    let start = 0;
    let end = 0;
    const ans = [];
    for (let i = 0; i < s.length; ++i) {
        end = Math.max(end, last[s.charCodeAt(i) - 'a'.charCodeAt(0)]);
        if (end === i) {
            ans.push(end - start + 1);
            start = i + 1;
        }

    }
    return ans;
};