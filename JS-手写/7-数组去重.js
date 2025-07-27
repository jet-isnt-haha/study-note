const array = [1, 2, 2, 2, 3, 4, 4, 5, 6];

//法一
const newArray1 = Array.from(new Set(array));
const newArray2 = [...new Set(array)];
console.log(newArray1);
console.log(newArray2);

//法二
const newArray3 = array.filter((item, index, array) => {
    return array.indexOf(item) === index;
})
console.log(newArray3);