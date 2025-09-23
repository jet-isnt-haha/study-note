Array.prototype.myForEach = function (callbackFn, thisArg) {
    if (this == null) {
        throw new TypeError('this is null or not defined');
    }
    if (typeof callbackFn !== "function") {
        throw new TypeError(callbackFn, ' is not a function');
    }

    //处理 this 是原始值的情况
    //（2）确保 this 始终是对象，避免类型错误
    const O = Object(this);
    //通过>>>0强制转换为无符号32位整数
    const len = O.length >>> 0;
    let k = 0;
    while (k < len) {
        if (k in O) {
            callbackFn.call(thisArg, O[k], k, O);
        }
        k++;
    }
}