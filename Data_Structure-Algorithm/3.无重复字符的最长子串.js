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


{

    /**
 * @param {string} s
 * @return {number}
 */
    var lengthOfLongestSubstring = function (s) {
        let map = new Map();
        let max = 0;
        let slow = 0;
        let fast = -1;
        for (const str of s) {
            map.set(str, map.has(str) ? map.get(str) + 1 : 1);
            ++fast;

            while (slow < fast) {
                if (map.get(s[fast]) > 1) {
                    map.set(s[slow], map.get(s[slow]) - 1);
                    slow++;

                } else {
                    break;
                }
            }
            max = Math.max(max, fast - slow + 1);
        }
        return max;
    };

}