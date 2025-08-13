/**
 * @param {number[][]} matrix
 * @param {number} target
 * @return {boolean}
 */
var searchMatrix = function (matrix, target) {
    let m = matrix.length - 1;
    let n = matrix[0].length - 1;
    let i = 0;
    while (i <= m && n >= 0) {
        if (matrix[i][n] === target) {
            return true;
        } else if (matrix[i][n] < target) {
            i++;
        } else {
            n--;
        }
    }
    return false

};