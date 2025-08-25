
function TreeNode(val, left, right) {
    this.val = (val === undefined ? 0 : val)
    this.left = (left === undefined ? null : left)
    this.right = (right === undefined ? null : right)
}

/**
 * @param {TreeNode} root
 * @return {boolean}
 */
{
    var isSymmetric = function (root) {
        const leftRoot = root.left;
        const rightRoot = root.right;
        let flag = true;
        function dfs(left, right) {
            if (left === null) {
                if (right) {
                    flag = false;

                }
                return;
            }
            if (right === null) {
                if (left) {
                    flag = false;

                }
                return;
            }
            if (left.val !== right.val) {
                flag = false;
                return;
            }
            dfs(left.left, right.right);
            dfs(left.right, right.left);
        }
        dfs(leftRoot, rightRoot);
        return flag;
    };

}


{
    var isSymmetric = function (root) {
        // 在【100. 相同的树】的基础上稍加改动
        function isSameTree(p, q) {
            if (p === null || q === null) {
                return p === q;
            }
            return p.val === q.val && isSameTree(p.left, q.right) && isSameTree(p.right, q.left);
        }
        return isSameTree(root.left, root.right);
    };

}