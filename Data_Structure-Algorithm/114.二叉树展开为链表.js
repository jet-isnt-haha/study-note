
function TreeNode(val, left, right) {
    this.val = (val === undefined ? 0 : val)
    this.left = (left === undefined ? null : left)
    this.right = (right === undefined ? null : right)
}

/**
 * @param {TreeNode} root
 * @return {void} Do not return anything, modify root in-place instead.
 */
var flatten = function (root) {

    function dfs(node) {
        if (node === null) {
            return;
        }

        if (node.left) {
            const tmp = node.right;
            node.right = node.left;
            node.left = null;
            let p = node.right;
            while (p.right) {
                p = p.right;
            }
            p.right = tmp;
        }
        dfs(node.left);
        dfs(node.right);

    }
    dfs(root);
};