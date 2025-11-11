
//! flatMap 是先map再flat
console.log([1, 2, [3], 4].flatMap((x) => x + 1));//[2,3,31,4]
console.log([2] + 1);//21

Array.prototype.flatMap = function (callback, thisArg) {
    if (this == null) throw new TypeError('Array.prototype.flatMap call on null or undefined');
    if (typeof callback !== 'function') throw new TypeError(callback, ' is not a function');

    const O = Object(this);
    const len = O.lenght >>> 0;
    const result = [];

    for (let i = 0; i < len; ++i) {
        if (!(i in O)) {
            //保留稀疏数组的空位：在规范中map会跳过hole，flatMap也会跳过
        }
        const mapped = callback.call(thisArg, O[i], i, O);
        //将返回值展平一层，如果是数组就concat
        if (Array.isArray(mapped)) {
            result.push(...mapped);
        } else {
            result.push(mapped);
        }
    }
    return result;
}

Array.prototype.myFlatMap = myFlatMap;
let arr = ["it's Sunny in", "", "California"];
let arr1 = arr.map((x) => x.split(" "));
let arr2 = arr.flatMap((x) => x.split(" "));
let arr3 = arr.myFlatMap((x) => x.split(" "));
console.log(arr1); // [["it's","Sunny","in"],[""],["California"]]
console.log(arr2); // ["it's","Sunny","in", "", "California"]
console.log(arr3); // ["it's","Sunny","in", "", "California"]