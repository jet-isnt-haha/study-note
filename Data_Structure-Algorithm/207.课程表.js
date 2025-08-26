/**
 * @param {number} numCourses
 * @param {number[][]} prerequisites
 * @return {boolean}
 */
var canFinish = function (numCourses, prerequisites) {
    const arr = Array.from({ length: numCourses }, () => []);
    for (const [x, y] of prerequisites) {
        arr[x].push(y);
    }
    const color = new Array(numCourses).fill(0);

    function dfs(x) {
        color[x] = 1;
        for (const y of arr[x]) {
            if (color[y] === 1 || color[y] === 0 && dfs(y)) {
                return true;
            }
        }
        color[x] = 2;
        return false;
    }

    for (let i = 0; i < numCourses; ++i) {
        if (color[i] === 0 && dfs(i)) {
            return false;
        }
    }
    return true;
};