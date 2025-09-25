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






{
    Function.prototype.myBind = function (ctx, ...args) {
        if (typeof this !== 'function') {
            throw new TypeError('The bind target must be a function');
        }
        ctx = ctx == null ? globalThis : Object(ctx);
        const fn = this;
        return function (...subArgs) {
            const allArgs = [...args, ...subArgs];
            if (new.target) {
                const obj = {};
                Object.setPrototypeOf(obj, fn.prototype);
                fn.apply(obj, allArgs);
                return obj;
            } else {
                return fn.apply(ctx, allArgs);
            }
        }
    }


}




{
    Function.prototype.myBind = function (context) {
        if (typeof this !== 'function') {
            throw new TypeError('The bind target must be a function');
        }
        let self = this;//先获取函数
        // 处理 context 为 null/undefined 的情况
        const ctx = context == null ? globalThis : Object(context);
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


}




{
    Function.prototype.JETBind = function (context) {
        if (typeof this !== 'function') {
            throw new TypeError('The bind target must be a function');
        }

        const self = this;
        const ctx = context == null ? globalThis : Object(context);
        const args = Array.from(arguments).slice(1);

        const fBound = function () {
            const bindArgs = Array.from(arguments);

            // 这里不能用 this instanceof fBound，因为 fBound 被 Proxy 包装了
            // 需要用其他方法检测 new 调用
            if (new.target) {  // ES6+ 环境可用
                const obj = Object.create(self.prototype || null);
                const result = self.apply(obj, args.concat(bindArgs));
                return (typeof result === 'object' && result !== null) ? result : obj;
            } else {
                return self.apply(ctx, args.concat(bindArgs));
            }
        };

        return new Proxy(fBound, {
            get(target, prop) {
                if (prop === 'prototype') {
                    return undefined;
                }
                return Reflect.get(target, prop);
            },
            has(target, prop) {
                if (prop === 'prototype') {
                    return false;
                }
                return Reflect.has(target, prop);
            }
        });
    };

}

