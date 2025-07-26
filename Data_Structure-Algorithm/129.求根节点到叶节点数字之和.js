
function TreeNode(val, left, right) {
    this.val = (val === undefined ? 0 : val)
    this.left = (left === undefined ? null : left)
    this.right = (right === undefined ? null : right)
}

/**
 * @param {TreeNode} root
 * @return {number}
 */
var sumNumbers = function (root) {

    let sum = 0;
    let str = '';
    function dfs(node) {
        str += node.val;
        if (node.left === null && node.right === null) {
            sum += parseInt(str);
            return;
        }


        if (node.left) {
            dfs(node.left);
            str = str.slice(0, str.length - 1);
        }
        if (node.right) {
            dfs(node.right);
            str = str.slice(0, str.length - 1);
        }
    }
    dfs(root);
    return sum;
};

console.log(sumNumbers(new TreeNode(1, null, new TreeNode(5, null))));