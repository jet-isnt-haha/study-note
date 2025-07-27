/**
 * @param {number} n
 * @return {string[]}
 */
var generateParenthesis = function (n) {
    const res = [];

    function recursion(left, right, tmp, n) {

        if (left === n && right === n) {
            res.push(tmp);
            return;
        }

        if (left < n) recursion(left + 1, right, tmp + '(', n)
        if (right < n && left > right) recursion(left, right + 1, tmp + ')', n)

    }

    recursion(0, 0, '', n);
    return res;
};