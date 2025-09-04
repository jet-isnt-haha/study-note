
const PENDING = 'pending';
const FULFUILLED = 'fulfuilled';
const REJECTED = 'rejected';


class MyPromise {

    constructor(executor) {
        this.status = PENDING;

        this.value = undefined;

        this.reason - undefined;


        //! 为了确保then方法的回调总是在状态确认后被调用执行而引入的参数
        //! 将成功回调和失败回调存储起来
        this.onFulfilledCallback = [];
        this.onRejectedCallback = [];

        const resolve = (value) => {

            //只有处于pending才能执行状态发生变化，不能二次变化
            if (this.status === PENDING) {
                this.status = FULFUILLED;
                this.value = value;

                queueMicrotask(() => {
                    this.onFulfilledCallback.forEach((fn) => fn());
                });

            }
        };
        const reject = (reason) => {
            if (this.status === PENDING) {
                this.status = REJECTED;
                this.reason = reason;

                queueMicrotask(() => {
                    this.onRejectedCallback.forEach((fn) => fn());
                });
            }
        };
        try {
            executor(resolve, reject);
        } catch (error) {
            reject(error);
        }

    }

    then(onFulfilled, onRejected) {
        const promise2 = new MyPromise((resolve, reject) => {
            if (this.status === FULFILLED) {
                queueMicrotask(() => {
                    try {
                        const x = onFulfilled(this.value);
                        if (x instanceof MyPromise) {
                            x.then((promise_value) => {
                                resolve(promise_value);
                            });
                        } else {
                            resolve(x);
                        }
                    } catch (error) {
                        reject(error);
                    }
                });
            } else if (this.status === REJECTED) {
                queueMicrotask(() => {
                    try {
                        const x = onRejected(this.reason);
                        if (x instanceof MyPromise) {
                            x.then((promise_value) => {
                                resolve(promise_value);
                            });
                        } else {
                            resolve(x);
                        }
                    } catch (error) {
                        reject(error);
                    }
                });
            } else if (this.status === PENDING) {
                this.onFulfilledCallbacks.push(() => {
                    try {
                        const x = onFulfilled(this.value);
                        if (x instanceof MyPromise) {
                            x.then((promise_value) => {
                                resolve(promise_value);
                            });
                        } else {
                            resolve(x);
                        }
                    } catch (error) {
                        resolve(error);
                    }
                });
                this.onRejectedCallbacks.push(() => {
                    try {
                        const x = onRejected(this.reason);
                        if (x instanceof MyPromise) {
                            x.then((promise_value) => {
                                resolve(promise_value);
                            });
                        } else {
                            resolve(x);
                        }
                    } catch (error) {
                        reject(error);
                    }
                });
            }
        });
        return promise2;
    }


}

const promise = new MyPromise((resolve, reject) => {
    resolve("success");
});
promise
    .then((value) => {
        console.log(1);
        console.log("resolve", value);
        return 2;
    })
    .then((value) => {
        console.log(3);
        console.log("resolve", value);
    });

