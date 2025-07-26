/**
 * @param {character[][]} grid
 * @return {number}
 */
var numIslands = function (grid) {
    let island = 0;
    function dfs(i, j) {
        const n = grid.length;
        const m = grid[0].length;
        grid[i][j] = '0';

        if (i - 1 >= 0 && grid[i - 1][j] == 1) dfs(i - 1, j);
        if (i + 1 < n && grid[i + 1][j] == 1) dfs(i + 1, j);
        if (j - 1 >= 0 && grid[i][j - 1] == 1) dfs(i, j - 1);
        if (j + 1 < m && grid[i][j + 1] == 1) dfs(i, j + 1);
    }
    for (let i = 0; i < grid.length; ++i) {
        for (let j = 0; j < grid[i].length; ++j) {
            if (grid[i][j] === '1') {
                island++;
                dfs(i, j);//将i，j相邻及其自身全变为0
            }
        }
    }
    return island;
};
