//! instanceof 是判断构造函数的prototype属性是否出现在实例的原型链上

function myInstanceof(left, right) {

    let proto = left.__proto__;

    while (proto !== null) {
        if (proto === right.prototype) {
            return true;
        }
        proto = proto.__proto__;
    }
    return false;

}