
function TreeNode(val, left, right) {
    this.val = (val === undefined ? 0 : val)
    this.left = (left === undefined ? null : left)
    this.right = (right === undefined ? null : right)
}

/**
 * @param {TreeNode} root
 * @param {number} targetSum
 * @return {number}
 */
var pathSum = function (root, targetSum) {
    let map = new Map();
    let count = 0;
    map.set(0, 1);
    function dfs(node, s) {
        if (node === null) {
            return;
        }
        s += node.val;
        count += map.get(s - targetSum) ?? 0;
        map.set(s, (map.get(s) ?? 0) + 1);
        dfs(node.left, s);
        dfs(node.right, s);
        map.set(s, map.get(s) - 1);
        return;
    }
    dfs(root, 0);
    return count;
};