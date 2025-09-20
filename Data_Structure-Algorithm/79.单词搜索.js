/**
 * @param {character[][]} board
 * @param {string} word
 * @return {boolean}
 */
var exist = function (board, word) {
    let flag = false;
    let row = board.length;
    let col = board[0].length;

    for (let i = 0; i < row; ++i) {
        for (let j = 0; j < col; ++j) {
            if (board[i][j] === word[0]) {
                backTracking(0, i, j);
            }

        }
    }

    function backTracking(i, x, y) {
        if (i + 1 === word.length) {
            flag = true;
        }


        let tmp = board[x][y];
        //标记元素已被使用
        board[x][y] = false;

        if (x + 1 < row && word[i + 1] === board[x + 1][y]) backTracking(i + 1, x + 1, y);
        if (y + 1 < col && word[i + 1] === board[x][y + 1]) backTracking(i + 1, x, y + 1);
        if (x - 1 >= 0 && word[i + 1] === board[x - 1][y]) backTracking(i + 1, x - 1, y);
        if (y - 1 >= 0 && word[i + 1] === board[x][y - 1]) backTracking(i + 1, x, y - 1);

        board[x][y] = tmp;

    }


    return flag;

};