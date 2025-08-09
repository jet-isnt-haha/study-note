/**
 * @param {string} s
 * @param {string} p
 * @return {number[]}
 */
var findAnagrams = function (s, p) {
    let map = new Map();

    for (const item of p) {
        map.set(item, (map.get(item) || 0) + 1);
    }

    let length = p.length;

    let left = 0;
    let right = 0;
    const ans = [];
    while (right <= s.length) {

        map.set(s[right], (map.get(s[right]) || 0) - 1);
        while (map.get(s[right]) < 0) {
            map.set(s[left], map.get(s[left++]) + 1);
        }
        if (right - left + 1 === length) {
            ans.push(left);
        }
        right++;
    }
    return ans;
};

console.log(findAnagrams('cbaebabacd', 'cba'));