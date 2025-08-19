
function TreeNode(val, left, right) {
    this.val = (val === undefined ? 0 : val)
    this.left = (left === undefined ? null : left)
    this.right = (right === undefined ? null : right)
}

/**
 * @param {TreeNode} root
 * @return {number}
 */

var maxPathSum = function (root) {
    if (root === null) {
        return null;
    }
    let ans = -Infinity;
    function dfs(node) {
        if (node === null) return 0;
        const leftSum = dfs(node.left);
        const rightSum = dfs(node.right);

        ans = Math.max(ans, leftSum + rightSum + node.val);
        return Math.max(Math.max(leftSum, rightSum) + node.val, 0);
    }

    dfs(root);
    return ans;
};