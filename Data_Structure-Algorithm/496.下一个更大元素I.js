/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number[]}
 */
{
    //暴力解法 时间复杂度O（m*n）
    var nextGreaterElement = function (nums1, nums2) {
        const ans = [];
        nums1.forEach((num) => {
            const targetIndex1 = nums2.findIndex((value) => value === num);
            const targetIndex2 = nums2.findIndex((value, index) => {
                if (nums2[index + targetIndex1] && nums2[index + targetIndex1] > nums2[targetIndex1]) {
                    return true;
                }
            })
            if (targetIndex2 !== -1 && targetIndex1 !== -1) {
                ans.push(nums2[targetIndex1 + targetIndex2]);
            } else {
                ans.push(-1);
            }
        })
        return ans;
    };
}


{
    //单调栈+哈希表 时间复杂度（m+n）
    var nextGreaterElement = function (nums1, nums2) {
        let map = new Map();
        const stack = [];


        for (let i = nums2.length - 1; i >= 0; --i) {
            const num = nums2[i];

            while (stack.length && num >= stack[stack.length - 1]) {
                stack.pop();
            }

            map.set(num, stack.length ? stack[stack.length - 1] : -1)
            stack.push(num);
        }

        return new Array(nums1.length).fill(null).map((_, index) => map.get(nums1[index]))


    }

}
console.log(nextGreaterElement([4, 1, 2], [1, 3, 4, 2]));