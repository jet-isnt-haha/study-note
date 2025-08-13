/**
 * @param {number[][]} matrix
 * @return {void} Do not return anything, modify matrix in-place instead.
 */
//一次转置 一次行翻转
var rotate = function (matrix) {
    const n = matrix.length;
    for (let i = 0; i < n; ++i) {
        for (let j = 0; j < i; ++j) {
            const tmp = matrix[i][j];
            matrix[i][j] = matrix[j][i];
            matrix[j][i] = tmp;
        }
    }

    for (let i = 0; i < n; ++i) {
        let left = 0, right = n - 1;
        while (left < right) {
            const tmp = matrix[i][left];
            matrix[i][left] = matrix[i][right];
            matrix[i][right] = tmp;
            left++;
            right--;
        }
    }

};