//bind的使用场景

const person = {
    name: 'jet',
    sayHello: function () {
        console.log('hello~ ', this.name);
    }

}

person.sayHello();
const newP = {
    name: 'jelly'
}
const sayHi = person.sayHello.bind(newP)
sayHi();

//作为回调this可能丢失
setTimeout(person.sayHello, 1000);

setTimeout(person.sayHello.bind(newP), 2000);


Function.prototype.myBind = function (context) {
    if (typeof this !== 'function') {
        throw new TypeError('The bind target must be a function');
    }
    let self = this;//先获取函数
    // 处理 context 为 null/undefined 的情况
    const ctx = context == null ? globalThis : Object(context)
    const args = Array.from(arguments).slice(1);

    function fNOP() { }

    function fBound() {
        const bindArgs = Array.from(arguments);
        return self.apply(this instanceof fNOP ? this : ctx, args.concat(bindArgs));
    }

    fNOP.prototype = self.prototype;
    fBound.prototype = new fNOP();

    return fBound;
}