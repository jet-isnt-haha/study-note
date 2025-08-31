
function TreeNode(val, left, right) {
    this.val = (val === undefined ? 0 : val)
    this.left = (left === undefined ? null : left)
    this.right = (right === undefined ? null : right)
}

/**
 * @param {number[]} preorder
 * @param {number[]} inorder
 * @return {TreeNode}
 */
var buildTree = function (preorder, inorder) {
    if (preorder.length === 0) return null;
    let nodeNum = preorder.shift();
    let delimiterIndex = inorder.indexOf(nodeNum);
    let node = new TreeNode(nodeNum);
    node.left = buildTree(preorder.slice(0, delimiterIndex), inorder.slice(0, delimiterIndex));
    node.right = buildTree(preorder.slice(delimiterIndex), inorder.slice(delimiterIndex + 1));
    return node;
};