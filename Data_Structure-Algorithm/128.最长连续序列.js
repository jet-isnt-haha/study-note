/**
 * @param {number[]} nums
 * @return {number}
 */
var longestConsecutive = function (nums) {
    let set = new Set(nums);
    console.log(set);
    let longestStreak = 0;

    for (const num of set) {
        if (!set.has(num - 1)) {
            let currentNum = num;
            let currentStreak = 1;

            while (set.has(currentNum + 1)) {
                currentNum += 1;
                currentStreak += 1;
            }
            longestStreak = Math.max(longestStreak, currentStreak);
        }

    }
    return longestStreak;
};
longestConsecutive([0, 3, 7, 2, 5, 8, 4, 6, 0, 1])