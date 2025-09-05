const PENDING = "pending";
const FULFILLED = "fulfilled";
const REJECTED = "rejected";
class MyPromise {
    constructor(executor) {
        this.onFulfilledCallbacks = [];
        this.onRejectedCallbacks = [];
        this.status = PENDING;
        this.value = undefined;
        this.reason = undefined;
        const resolve = (value) => {
            if (this.status === PENDING) {
                this.status = FULFILLED;
                this.value = value;
                queueMicrotask(() => this.onFulfilledCallbacks.forEach((fn) => fn()));
            }
        };
        const reject = (reason) => {
            if (this.status === PENDING) {
                this.status = REJECTED;
                this.reason = reason;
                queueMicrotask(() => this.onRejectedCallbacks.forEach((fn) => fn()));
            }
        };
        executor(resolve, reject);
    }
    //编写then方法
    then(onFulfilled, onRejected) {


        onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : (value) => value;
        onRejected = typeof onRejected === 'function' ? onRejected : (reason) => { throw reason; };

        const promise2 = new MyPromise((resolve, reject) => {
            const handleCallback = (callback, value, resolve, reject) => {
                queueMicrotask(() => {
                    try {
                        const x = callback(value);
                        resolvePromise(promise2, x, resolve, reject);
                    } catch (error) {
                        reject(error);
                    }
                });
            };
            if (this.status === FULFILLED) {
                handleCallback(onFulfilled, this.value, resolve, reject);
            } else if (this.status === REJECTED) {
                handleCallback(onRejected, this.reason, resolve, reject);
            } else if (this.status === PENDING) {
                this.onFulfilledCallbacks.push(() =>
                    handleCallback(onFulfilled, this.value, resolve, reject)
                );
                this.onRejectedCallbacks.push(() =>
                    handleCallback(onRejected, this.reason, resolve, reject)
                );
            }
        });
        return promise2;
    }


    catch(onRejected) {
        return this.then(null, onRejected);
    }

    finally(onFinally) {
        this.then(() => { onFinally(); }, () => { onFinally(); })
    }

    static resolve(value) {
        if (value instanceof MyPromise) {
            return value;
        }

        return new MyPromise(resolve => {
            resolve(value);
        });
    }

    static reject(reason) {
        return new MyPromise((_, reject) => {
            reject(reason);
        })
    }
}
// ==== 新增 ====
function resolvePromise(promise2, x, resolve, reject) {

    if (x === promise2) {
        return reject(new TypeError());
    }
    if (x instanceof MyPromise) {
        x.then(resolve, reject)
    } else {
        resolve(x)
    }
}
module.exports = MyPromise;
