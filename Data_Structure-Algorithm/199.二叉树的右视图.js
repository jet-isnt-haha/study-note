
function TreeNode(val, left, right) {
    this.val = (val === undefined ? 0 : val)
    this.left = (left === undefined ? null : left)
    this.right = (right === undefined ? null : right)
}

/**
 * @param {TreeNode} root
 * @return {number[]}
 */
{
    var rightSideView = function (root) {
        if (root === null) return [];
        let result = [];
        function dfs(node, length) {
            if (!node) { return; }
            if (length === result.length) {
                result.push(node.val);
            }

            dfs(node.right, length + 1);
            dfs(node.left, length + 1);
            return;
        }

        dfs(root, 0);
        return result;
    };
}

{
    var rightSideView = function (root) {
        if (root === null) { return [] };
        let result = [];
        let queue = [];
        queue.push(root);
        while (queue.length) {
            const len = queue.length;
            result.push(queue[0].val);
            for (let i = 0; i < len; ++i) {
                const node = queue.shift();
                if (node.right) { queue.push(node.right); }
                if (node.left) { queue.push(node.left); }
            }
        }
        return result;
    };
}