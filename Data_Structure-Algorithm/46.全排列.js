/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var permute = function (nums) {
    const res = [];
    const result = []
    let len = nums.length;
    function backTracking(index) {

        if (result.length === len) {
            res.push(result.slice());
        }


        for (let i = index; i < len; ++i) {

            result.push(nums.shift());
            backTracking(index + 1);
            let one = result.pop();
            nums.push(one);
        }
    }
    backTracking(0);
    return res;
};

console.log(permute([1, 2, 3]));