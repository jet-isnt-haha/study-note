/**
 * @param {string} num1
 * @param {string} num2
 * @return {string}
 */
var addStrings = function (num1, num2) {
    if (num1.length === 0) return num2
    if (num2.length === 0) return num1
    let m = num1.length - 1;
    let n = num2.length - 1;

    let carry = 0;
    let result = [];

    while (m >= 0 || n >= 0 || carry !== 0) {
        let Val1 = num1[m] ? parseInt(num1[m]) : 0;
        let Val2 = num2[n] ? parseInt(num2[n]) : 0;
        let sum = Val1 + Val2 + carry;

        let num = sum % 10;
        result.unshift(num);
        carry = (sum >= 10 ? 1 : 0);
        m--; n--;
    }
    return result.join('');
};
