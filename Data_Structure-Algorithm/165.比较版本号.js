/**
 * @param {string} version1
 * @param {string} version2
 * @return {number}
 */
var compareVersion = function (version1, version2) {
    let sum1 = 0;
    let sum2 = 0;
    for (let i = 0, j = 0; i < version1.length || j < version2.length;) {
        let string = '';
        while (i < version1.length && version1[i] !== '.') {
            string += version1[i++];
        }
        sum1 += string ? parseInt(string) : 0;
        string = '';
        while (j < version2.length && version2[j] !== '.') {
            string += version2[j++];
        }
        sum2 += string ? parseInt(string) : 0;
        if (sum1 > sum2) {
            return 1;
        } else if (sum1 < sum2) {
            return -1;
        } else {
            sum1 = sum2 = 0;
        }
        i++; j++;
    }
    return 0;
};
console.log(compareVersion("1.0.1", "1"));