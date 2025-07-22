/**
 * @param {string} s
 * @return {string}
 */
var longestPalindrome = function (s) {
    if (s.length < 2) return s;
    //dp[i][j]为i到j是否为回文串
    let dp = new Array(s.length).fill(null).map(() => new Array(s.length).fill(false));
    for (let i = 0; i < s.length; ++i) {
        dp[i][i] = true;
    }
    let maxLen = 1;
    let begin = 0;
    //最外层是判断回文子串的长度
    for (let L = 2; L <= s.length; ++L) {
        for (let i = 0; i < s.length; ++i) {

            //i为左边界，j为右边界
            let j = L + i - 1;

            if (j >= s.length) {
                break;
            }

            if (s[i] !== s[j]) {
                continue;
            } else {
                if (L < 4) {
                    dp[i][j] = true;
                } else {
                    dp[i][j] = dp[i + 1][j - 1];
                }
            }

            if (dp[i][j] === true && L > maxLen) {
                maxLen = L;
                begin = i;
            }
        }

    }
    return s.substring(begin, begin + maxLen);
};
console.log(longestPalindrome("aacabdkacaa"));