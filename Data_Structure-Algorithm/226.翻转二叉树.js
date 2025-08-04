
function TreeNode(val, left, right) {
    this.val = (val === undefined ? 0 : val)
    this.left = (left === undefined ? null : left)
    this.right = (right === undefined ? null : right)
}

/**
 * @param {TreeNode} root
 * @return {TreeNode}
 */
var flipTree = function (root) {
    if (root === null) {
        return null;
    }
    flipTree(root.left);
    flipTree(root.right);
    let tmp = root.right ?? null;
    root.right = root.left
    root.left = tmp;

    return root;
};

flipTree(new TreeNode(5, new TreeNode(7,
    new TreeNode(8), new TreeNode(3)
), new TreeNode(9, new TreeNode(2), new TreeNode(4))))