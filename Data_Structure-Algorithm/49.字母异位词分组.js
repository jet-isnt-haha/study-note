/**
 * @param {string[]} strs
 * @return {string[][]}
 */
var groupAnagrams = function (strs) {
    const map = new Map();
    for (let i = 0; i < strs.length; ++i) {
        let key = Array.from(strs[i]).sort().toString();
        const list = map.get(key) ? map.get(key) : new Array();
        list.push(strs[i]);
        map.set(key, list);
    }
    return Array.from(map.values());
};

