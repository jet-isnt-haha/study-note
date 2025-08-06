

function currying(fn) {

    return function curry() {
        let args = arguments;
        const context = this;

        if (args.length === fn.length) {
            return fn.apply(context, args);
        } else {
            return function () {
                return curry.apply(context, [...args, ...arguments]);
            }
        }
    }

}

const a = {
    name: 'aaa',

    fn: currying(function add(a, b, c) {
        console.log(this.name);
        return a + b + c;
    })
}

console.log(a.fn(1)(2)(3));