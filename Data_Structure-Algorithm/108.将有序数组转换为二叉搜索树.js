
function TreeNode(val, left, right) {
    this.val = (val === undefined ? 0 : val)
    this.left = (left === undefined ? null : left)
    this.right = (right === undefined ? null : right)
}

/**
 * @param {number[]} nums
 * @return {TreeNode}
 */
{
    var sortedArrayToBST = function (nums) {

        function dfs(left, right) {
            if (left === right) {
                return null;

            }
            const mid = Math.floor((left + right) / 2);

            return new TreeNode(nums[mid], dfs(left, mid), dfs(mid + 1, right));
        }
        return dfs(0, nums.length);
    }
}

{


    var sortedArrayToBST = function (nums) {
        const dfs = (nums) => {
            if (nums.length === 0) return null
            const mid = (nums.length / 2) >> 0;
            const root = new TreeNode(nums[mid]);

            root.left = dfs(nums.slice(0, mid));
            root.right = dfs(nums.slice(mid + 1));
            return root;
        }
        return dfs(nums)
    };

}