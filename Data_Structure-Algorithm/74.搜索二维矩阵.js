/**
 * @param {number[][]} matrix
 * @param {number} target
 * @return {boolean}
 */
var searchMatrix = function (matrix, target) {
    const m = matrix.length;
    const n = matrix[0].length;
    let row = -1;
    for (let i = 0; i < m; ++i) {
        if (target > matrix[i][n - 1]) {
            continue;
        }
        else if (target < matrix[i][n - 1]) {
            row = i;
            break;
        } else {
            return true;
        }
    }

    if (row !== -1) {
        for (let i = 0; i < n; ++i) {
            if (matrix[row][i] === target) {
                return true;
            }
        }
    }
    return false;
};