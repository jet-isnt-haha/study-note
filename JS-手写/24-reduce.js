

Array.prototype.myReduce = function (callbackFn, initialValue) {
    if (this == null) {
        throw TypeError('this is null or not defined');
    }
    if (typeof callbackFn !== 'function') {
        throw new TypeError(callbackFn + ' is not a function');
    }

    const O = Object(this);
    const len = O.length >>> 0;
    let k = 0;
    let acc;
    if (arguments.length > 1) {
        acc = initialValue;
    } else {
        //! 取数组中第一个不为empty的初始值
        while (k < len && !(k in O)) {
            k++;
        }

        if (k >= len) {
            throw new TypeError('Reduce of empty array with no initial value')
        }

        acc = O[k++];
    }

    while (k < len) {

        if (k in O) {
            acc = callbackFn(acc, O[k], k, O);

        }
        k++;
    }
    return acc;
}