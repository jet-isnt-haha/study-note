
function flatMap(arr = []) {
    let list = [];
    arr.forEach(item => {

        if (Array.isArray(item)) {
            const l = flatMap(item);
            list.push(...l);
        } else {
            list.push(item);
        }
    })

    return list;
}
let myFlatMap = function (fn) {
    let target = this;
    return target.map((i) => fn(i)).flat();
};
Array.prototype.myFlatMap = myFlatMap;
let arr = ["it's Sunny in", "", "California"];
let arr1 = arr.map((x) => x.split(" "));
let arr2 = arr.flatMap((x) => x.split(" "));
let arr3 = arr.myFlatMap((x) => x.split(" "));
console.log(arr1); // [["it's","Sunny","in"],[""],["California"]]
console.log(arr2); // ["it's","Sunny","in", "", "California"]
console.log(arr3); // ["it's","Sunny","in", "", "California"]