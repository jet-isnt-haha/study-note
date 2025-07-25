
function TreeNode(val, left, right) {
    this.val = (val === undefined ? 0 : val)
    this.left = (left === undefined ? null : left)
    this.right = (right === undefined ? null : right)
}

/**
 * @param {TreeNode} root
 * @return {number[][]}
 */
var levelOrder = function (root) {
    if (!root) return [];
    let result = []
    let queue = [root]
    let subRes = []
    while (queue.length) {
        let len = queue.length;

        for (let i = 0; i < len; ++i) {
            const node = queue.shift();
            subRes.push(node.val);
            if (node.left) { queue.push(node.left) }
            if (node.right) { queue.push(node.right) }
        }
        result.push(subRes);
        subRes = []


    }
    return result;
};