
function TreeNode(val, left, right) {
    this.val = (val === undefined ? 0 : val)
    this.left = (left === undefined ? null : left)
    this.right = (right === undefined ? null : right)
}

/**
 * @param {TreeNode} root
 * @return {boolean}
 */
var isValidBST = function (root) {
    if (root === null) return true;
    let flag = true;
    let prev = -Infinity;
    function dfs(node) {
        if (node === null) return;

        dfs(node.left);
        if (node.val <= prev) { flag = false; return; }
        prev = node.val;
        dfs(node.right);

    }
    dfs(root);
    return flag;
};