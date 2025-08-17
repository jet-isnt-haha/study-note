//! Object.create()方法创建一个新对象，使用现有的对象来提供新创建的对象的__proto__

Object.myCreate = function (proto, propertyObject = undefined) {
    if (typeof proto !== Object && typeof proto !== 'function') {
        throw new TypeError('proto必须为对象或函数');
    }
    // 校验第二个参数：如果存在（非 undefined），必须是对象
    if (propertyObject !== undefined) {
        if (typeof propertyObject !== 'object' || propertyObject === null) {
            throw new TypeError('Property description object must be an object');
        }
    }

    function F() { }
    F.prototype = proto;
    // 定义额外属性
    if (propertyObject !== undefined) {
        Object.defineProperties(obj, propertyObject);
    }
    return new F();
}