//元组
let arr1: [number, boolean] = [1, false];

//只读元组
let arr2: readonly [number, boolean] = [1, false];
let arr3: readonly [x: number, y?: boolean] = [1];
arr1[0] = 1;
arr1[1] = true;

type first1 = (typeof arr1)[1];
type first2 = (typeof arr1)["length"];
