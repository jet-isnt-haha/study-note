/**
 * @param {number[][]} grid
 * @return {number}
 */
var orangesRotting = function (grid) {
    let m = grid.length, n = grid[0].length;
    let fresh = 0;
    let q = [];
    let ans = 0;
    for (let i = 0; i < m; ++i) {
        for (let j = 0; j < n; ++j) {
            if (grid[i][j] === 1) {
                fresh++;
            } else if (grid[i][j] === 2) {
                q.push([i, j]);
            }

        }
    }

    while (fresh && q.length) {
        ans++;
        const tmp = q;
        q = [];

        for (const [x, y] of tmp) {
            for (const [i, j] of [[x - 1, y], [x + 1, y], [x, y - 1], [x, y + 1]]) {
                if (i >= 0 && i < m && j >= 0 && j < n && grid[i][j] === 1) {
                    fresh--;
                    grid[i][j] = 2;
                    q.push([i, j]);
                }
            }
        }
    }
    return fresh ? -1 : ans;
};