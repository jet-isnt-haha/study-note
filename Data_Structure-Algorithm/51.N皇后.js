/**
 * @param {number} n
 * @return {string[][]}
 */
var solveNQueens = function (n) {
    const ans = [];
    const board = new Array(n).fill(0).map(_ => new Array(n).fill('.'));
    function backTracking(index) {
        if (index === n) {
            ans.push(board.map(row => row.join('')));
            return;
        }


        for (let i = 0; i < n; ++i) {
            if (isValid(board, index, i)) {
                board[index][i] = 'Q';
                backTracking(index + 1);
                board[index][i] = '.';
            }
        }
    }

    function isValid(board, row, col) {
        if (row === 0) return true;

        for (const _row of board) {
            if (_row[col] === 'Q') return false;
        }

        let i = row;
        let j = col;
        while (i >= 0 && j >= 0) {
            if (board[i--][j--] === 'Q') return false;
        }

        i = row;
        j = col;
        while (i >= 0 && j < n) {
            if (board[i--][j++] === 'Q') return false;
        }

        if (row < 0 || row >= n || col < 0 || col >= n) return false;

        return true;
    }
    backTracking(0);
    return ans;
};
solveNQueens(4)