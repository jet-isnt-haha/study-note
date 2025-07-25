/* 
    typeof可以正确识别：Undefined、Boolean、Number、String、Symbol、Function等类型数据，
    但是对于其他的都会认为是object，比如Null、Date等
*/
function Mytypeof(obj) {
    const type = Object.prototype.toString.call(obj).slice(8, -1).toLowerCase();

    //处理其他被认为object的数据类型
    if (["array", "date", "regexp", "null", "map", "set"].includes(type)) return "object";
    return type;
}


//测试用例
console.log(Object.prototype.toString.call([]).slice(8, -1));
console.log(toString(Array));
console.log(typeof Array);
console.log(Mytypeof(Array));
console.log(Mytypeof(new Date()));
console.log(typeof new Date());

const a = 1;
const b = 'a';
const c = true;
const d = undefined;
const e = Symbol('ss');
const f = null;
const g = () => {
    console.log('aaa');
}
const h = function () {
    console.log('bbb');
}
const i = BigInt(12)

// console.log(typeof a);
// console.log(typeof b);
// console.log(typeof c);
// console.log(typeof d);
// console.log(typeof e);
// console.log(typeof f);
// console.log(typeof g);
// console.log(typeof h);
// console.log(typeof i);

const j = new Set([123, 235]);
const k = new Date()
// console.log(typeof j);
// console.log(typeof (typeof a));
// console.log(j);





