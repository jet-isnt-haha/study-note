const { fork } = require("child_process");

function TreeNode(val, left, right) {
    this.val = (val === undefined ? 0 : val)
    this.left = (left === undefined ? null : left)
    this.right = (right === undefined ? null : right)
}

/**
 * @param {TreeNode} root
 * @param {number} targetSum
 * @return {boolean}
 */
var hasPathSum = function (root, targetSum) {
    let flag = false;
    let sum = 0;
    function bfs(node) {
        sum += node.val;
        if (sum === targetSum && !node.left && !node.right) {
            flag = true;
        }
        node.left && bfs(node.left);
        sum -= node.left ? node.left.val : 0;
        node.right && bfs(node.right);
        sum -= node.right ? node.left.right : 0;
    }
    bfs(root);
    return flag;
};
console.log(hasPathSum([5, 4, 8, 11, null, 13, 4, 7, 2, null, null, null, 1], 22));