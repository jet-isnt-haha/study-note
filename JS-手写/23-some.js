Array.prototype.mySome = function (callbackFn, thisArg) {

    if (this == null) {
        throw new TypeError('this is null or not defined');
    }
    if (typeof callbackFn !== 'function') {
        throw new TypeError(callbackFn, ' is not a function');
    }

    const O = Object(this);
    const len = O.length >>> 0;
    let k = 0;
    while (k < len) {
        if (k in O) {
            if (callbackFn.call(thisArg, O[k], k, O)) {
                return true;
            }
        }
        k++;
    }
    return false;
}