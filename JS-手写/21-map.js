
Array.prototype.myMap = function (callbackFn, thisArg) {
    if (this == null) {
        throw new TypeError('this is null or not defined');
    }
    if (typeof callbackFn !== 'function') {
        throw new TypeError(callbackFn + ' is not a function');
    }

    const O = Object(this);
    const len = O.length >>> 0;

    let k = 0;
    let res = [];
    while (k < len) {
        if (k in O) {
            res[k] = callbackFn.call(thisArg, O[k], k, O);
        }
        k++;
    }
    return res;
}