/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
{
    var moveZeroes = function (nums) {
        let stackSize = 0;
        for (const x of nums) {
            if (x !== 0) {
                nums[stackSize++] = x;
            }
        }
        nums.fill(0, stackSize);
    };
}


{
    var moveZeroes = function (nums) {
        let len = nums.length;
        for (let i = 0; i < len; ++i) {
            if (nums[i] === 0) {
                for (let j = i + 1; j < nums.length; ++j) {
                    nums[j - 1] = nums[j];
                }
                nums[nums.length - 1] = 0;
                i--;
                len--;
            }
        }
    };
}
console.log(moveZeroes([0, 1, 0, 3, 12]));