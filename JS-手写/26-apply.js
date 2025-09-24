Function.prototype.myApply = function (context, arr) {
    context = context || globalThis;
    context.fn = this;

    let result;
    if (!arr) {
        result = context.fn();
    } else {

        const args = [];
        for (let i = 0, len = arr.length; i < len; ++i) {
            args.push(`arr[${i}]`);
        }

        result = eval(`context.fn(${args})`);
    }
    delete context.fn;
    return result;
}