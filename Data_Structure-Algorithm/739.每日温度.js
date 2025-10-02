/**
 * @param {number[]} temperatures
 * @return {number[]}
 */
var dailyTemperatures = function (temperatures) {

    const ans = new Array(temperatures.length).fill(0);

    const stack = [[0, temperatures[0]]];
    for (let i = 1; i < temperatures.length; ++i) {
        while (stack.length && temperatures[i] > stack.at(-1)[1]) {
            ans[stack[stack.length - 1][0]] = i - stack.pop()[0];

        }

        stack.push([i, temperatures[i]]);

    }

    return ans;

};


console.log(dailyTemperatures([73, 74, 75, 71, 69, 72, 76, 73]));