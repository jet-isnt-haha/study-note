/**
 * @param {string} s
 * @return {string[][]}
 */
var partition = function (s) {
    const ans = [];
    const subRes = [];
    function backTracking(index) {
        if (index >= s.length) {
            ans.push(subRes.slice());
            return;
        }


        for (let i = index; i < s.length; ++i) {
            if (!isPartition(s.substring(index, i + 1))) { continue; }
            subRes.push(s.substring(index, i + 1));
            backTracking(i + 1);
            subRes.pop();
        }
        return;
    }

    /**
     * 
     * @param {string} s 
     */
    function isPartition(s) {
        let left = 0, right = s.length - 1;
        while (left < right) {
            if (s[left] !== s[right]) return false;
            left++;
            right--;
        }
        return true;
    }
    backTracking(0);
    console.log(ans);
    return ans;
};

partition("aab")
