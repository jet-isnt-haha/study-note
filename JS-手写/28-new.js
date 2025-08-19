// ! new运算符用来创建用户自定义的对象类型的实例或者具有构造函数的内置对象的实例

/* 
    实现要点:
    new 会产生一个新对象
    新对象需要能够访问到构造函数的属性，所以需要重新指定它的原型
    构造函数可能会显示返回
*/

function myNew() {
    const obj = {};
    const Constructor = [].shift().call(arguments);
    obj.__proto__ = Constructor.prototype;
    let result = Constructor.apply(obj, arguments);

    //result || obj考虑了构造函数显示返回null的情况
    return typeof result === 'object' ? result || obj : obj;
}

function person(name, age) {
    this.name = name
    this.age = age
}
// let p = myNew(person, 'jet', 20);
// let p1 = new person('jelly', 19);
// console.log(p);
// console.log(p1);

/* let p = myNew(Number);
let p1 = new Number();
console.log(p);
console.log(p1); */

