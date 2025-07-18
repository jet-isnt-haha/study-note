/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring = function (s) {
    if (s.length <= 1) return s.length;

    let leftIndex = 0;
    let rightIndex = 0;
    let newMap = new Map();
    let length = 0;

    while (rightIndex < s.length) {
        if (newMap.has(s[rightIndex])) {
            newMap.set(s[rightIndex], newMap.get(s[rightIndex]) + 1);
        } else {
            newMap.set(s[rightIndex], 1);
        }

        while (newMap.get(s[rightIndex]) > 1) {
            newMap.set(s[leftIndex], newMap.get(s[leftIndex++]) - 1);
        }
        length = Math.max(length, rightIndex - leftIndex + 1);
        rightIndex++;
    }
    return length;

};