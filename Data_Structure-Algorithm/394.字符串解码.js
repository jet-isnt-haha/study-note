/**
 * @param {string} s
 * @return {string}
 */
var decodeString = function (s) {
    let stack = [];
    let res = '';
    let k = 0;
    for (const str of s) {
        if (str >= 'a' && str <= 'z') {
            res += str;
        } else if (str >= '0' && str <= '9') {
            k = k * 10 + parseInt(str);
        } else if (str === '[') {
            stack.push([res, k]);
            res = '';
            k = 0;
        } else {
            const [pre_res, pre_k] = stack.pop();
            res = pre_res + res.repeat(pre_k);
        }
    }

    return res;
};