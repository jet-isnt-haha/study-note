/**
 * @param {number[][]} matrix
 * @return {void} Do not return anything, modify matrix in-place instead.
 */
var setZeroes = function (matrix) {
    let m = matrix.length;
    let n = matrix[0].length
    let xSet = new Set(), ySet = new Set();
    for (let i = 0; i < m; ++i) {
        for (let j = 0; j < n; ++j) {
            if (matrix[i][j] === 0) {
                xSet.add(i);
                ySet.add(j);
            }
        }
    }

    for (let i = 0; i < m; ++i) {
        for (let j = 0; j < n; ++j) {
            if (xSet.has(i) || ySet.has(j)) {
                matrix[i][j] = 0;
            }
        }
    }
};