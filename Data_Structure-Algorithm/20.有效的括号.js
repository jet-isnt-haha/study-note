/**
 * @param {string} s
 * @return {boolean}
 */
var isValid1 = function (s) {
    let len = s.length;
    if (len % 2 !== 0) {
        return false;
    }
    let length = len / 2;
    for (let i = 0; i < length; ++i) {
        s = s.replace("{}", "");
        s = s.replace("[]", "");
        s = s.replace("()", "");
    }
    return s.length === 0;
};
var isValid2 = function (s) {
    const stack = [];
    for (let i = 0; i < s.length; i++) {
        let c = s[i];
        switch (c) {
            case '(':
                stack.push(')');
                break;
            case '[':
                stack.push(']');
                break;
            case '{':
                stack.push('}');
                break;
            default:
                if (c !== stack.pop()) {
                    return false;
                }
        }
    }
    return stack.length === 0;
};

