/**
 * @param {number[][]} matrix
 * @return {number[]}
 */
var spiralOrder = function (matrix) {
    const res = [];
    let left = 0;
    let right = matrix[0].length - 1;
    let up = 0;
    let down = matrix.length - 1;

    while (left <= right && up <= down) {

        for (let i = left; i <= right; ++i) res.push(matrix[up][i]);

        up++;
        if (up > down) break;

        for (let i = up; i <= down; ++i) res.push(matrix[i][right]);

        right--;
        if (left > right) break;

        for (let i = right; i >= left; --i) res.push(matrix[down][i]);

        down--;
        if (up > down) break;

        for (let i = down; i >= up; --i) res.push(matrix[i][left]);

        left++;
        if (left > right) break;

    }
    return res;
};