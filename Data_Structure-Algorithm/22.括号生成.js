/**
 * @param {number} n
 * @return {string[]}
 */
{
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

}


{
    //暴力回溯法

    var generateParenthesis = function (n) {
        const ans = []
        let subRes = [];
        function backTracking(count) {
            if (count === 2 * n) {
                let tmp = subRes.join('');
                for (let i = 0; i < n; ++i) {
                    tmp = tmp.replace('()', '');
                }

                if (tmp.length === 0) {
                    ans.push(subRes.join(''));
                }
                return;
            }

            for (let i = 1; i <= 2; ++i) {
                subRes.push(i % 2 ? '(' : ')');
                backTracking(count + 1);
                subRes.pop();
            }

        }
        backTracking(0);
        return ans;
    }

}