"use strict";
{
    //联合类型
    let phone = 123456;
    let fn = function (type) {
        return !!type;
    };
    //交叉类型
    const foo = (bar) => {
        console.log(bar);
    };
    //类型断言(类型断言不能滥用)
    let fn2 = function (num) {
        console.log(num.length);
    };
    let fn3 = function (num) {
        console.log(num.length);
    };
    let fn4 = function (num) {
        return num;
    };
}
