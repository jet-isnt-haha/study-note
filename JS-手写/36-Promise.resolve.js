//Promise.resolve(value)可以将任何值转成值为value状态是fulfilled的Promise，但如果传入的值本身是Promise则会原样返回它

Promise.resolve = function (value) {
    if (value instanceof Promise) {
        return value;
    }

    return new Promise((resolve) => resolve(value));
}