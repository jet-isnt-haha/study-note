/**
 * @param {string} s
 * @param {string[]} wordDict
 * @return {boolean}
 */
var wordBreak = function (s, wordDict) {
    const dp = new Array(s.length + 1).fill(false);
    dp[0] = true;

    for (let i = 0; i <= s.length; ++i) {
        for (let j = 0; j < wordDict.length; ++j) {
            if (i + wordDict[j].length <= s.length && wordDict[j] === s.slice(i, i + wordDict[j].length) && dp[i] === true) {
                dp[wordDict[j].length + i] = true;
            }
        }
    }

    return dp[s.length];
};