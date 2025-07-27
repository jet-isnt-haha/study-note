/* 
    要求：

支持对象、数组、日期、正则的拷贝。
处理原始类型（原始类型直接返回，只有引用类型才有深拷贝这个概念）。
处理 Symbol 作为键名的情况。
处理函数（函数直接返回，拷贝函数没有意义，两个对象使用内存中同一个地址的函数，问题不大）。
处理 DOM 元素（DOM 元素直接返回，拷贝 DOM 元素没有意义，都是指向页面中同一个）。
额外开辟一个储存空间 WeakMap，解决循环引用递归爆栈问题（引入 WeakMap 的另一个意义，配合垃圾回收机制，防止内存泄漏）。

*/


//法一
function deepClone(target, hash = new WeakMap()) {

    if (target === null) return target;
    if (target instanceof Date) return new Date(target);
    if (target instanceof RegExp) return new RegExp(target);
    if (target instanceof HTMLElement) return target;

    if (typeof target !== 'object') return target;

    if (hash.get(target)) return hash.get(target);
    const cloneTarget = new target.constructor();
    hash.set(target, cloneTarget);

    Reflect.ownKeys(target).forEach(key => {
        cloneTarget[key] = deepClone(target[key], hash);
    })
    return cloneTarget;
}

//测试用例
const obj = {
    person: {
        name: 'jet'
    }
}
//法二
const newObj = JSON.parse(JSON.stringify(obj))
obj.person.name = 'jelly' // 改变原来的深层对象


console.log(newObj);

//! 但是法二存在缺陷 如下
const obj2 = {
    a: undefined,
    b: Symbol('b'),
    c: function () { },
    d: NaN,
    e: Infinity,
    f: -Infinity
}

const newObj2 = JSON.parse(JSON.stringify(obj2));
console.log(newObj2);// 结果为{}

//! 会忽略undefined、symbol、函数

//! NaN、Infinity、-Infinity 会被序列化为 null

//! 而且还不能解决循环引用的问题

const obj3 = {
    a: 1
}

obj3.obj3 = obj3

const newObj3 = JSON.parse(JSON.stringify(obj3)) // 报错


// 浏览器自身的深拷贝函数 structuredClone()