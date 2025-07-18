/**
 * @param {number[]} nums1
 * @param {number} m
 * @param {number[]} nums2
 * @param {number} n
 * @return {void} Do not return anything, modify nums1 in-place instead.
 */
var merge = function (nums1, m, nums2, n) {
    if (!n || !nums2.length) return;
    if (!m || !nums1.length) {
        for (let i = 0; i < n; ++i) {
            nums1[i] = nums2.shift();
        }
    }

    let aIndex = m - 1;
    let bIndex = n - 1;
    let mIndex = m + n - 1;

    //nums1 = [1,2,3,0,0,0], m = 3, nums2 = [2,5,6], n = 3
    while (aIndex >= 0 && bIndex >= 0) {
        if (nums1[aIndex] > nums2[bIndex]) {
            nums1[mIndex--] = nums1[aIndex--];
        } else {
            nums1[mIndex--] = nums2[bIndex--];
        }


        if (aIndex < 0) {
            while (bIndex >= 0) {
                nums1[mIndex--] = nums2[bIndex--];
            }


        };
    }

}
