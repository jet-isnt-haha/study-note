console.log([1, [2, [3, [4]]]].flat(4));
const arr = [1, 2, [3, 4]];
//ES5
function myFlatES5(arr = []) {
    let result = []
    for (let i = 0; i < arr.length; ++i) {
        if (Array.isArray(arr[i])) {
            result = result.concat(myFlatES5(arr[i]));
        } else {
            result.push(arr[i])
        }
    }
    return result;
}


console.log(myFlatES5(arr));

//ES6
function myFlatES6(arr = []) {
    while (arr.some(item => Array.isArray(item))) {
        arr = [].concat(...arr);
    }
    return arr;
}
console.log(myFlatES5(arr));
