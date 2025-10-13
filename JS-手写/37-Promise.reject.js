//和Promise.resolve()类似，Promise.reject()会实例化一个rejected状态的Promise。但与Promise.resolve()不同的是，如果给Promise.reject()传递一个Promise对象，则这个对象会成为新的Promise值。

Promise.reject = function (value) {
    return new Promise((_, reject) => reject(value));
}