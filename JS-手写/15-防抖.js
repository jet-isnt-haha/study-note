//! 防抖：触发高频事件N秒后只会执行一次，如果N秒内事件再次触发，则会重新计时。

//  简单版
//函数内部支持使用this和event事件
function debounce(fn, wait) {
    let timeout;
    return function () {
        let context = this;
        let args = arguments;
        clearTimeout(timeout);
        console.log('Recalculate');
        timeout = setTimeout(() => fn.apply(context, args), wait);
    }
}

//最终版
//还支持：立即执行、函数可能有返回值、支持取消功能

function debounceProMax(fn, wait, immediate) {
    let timeout, result;

    let debounceProMax = function () {
        let context = this;
        let args = arguments;

        if (timeout) {
            clearTimeout(timeout);
            console.log('clearSuccess:', timeout);
        }
        if (immediate) {
            let callNow = !timeout;
            console.log('Recalculate');
            console.log('callNow:', callNow);
            console.log('timer:', timeout);
            timeout = setTimeout(() => {
                timeout = null; if (!callNow) fn.apply(context, args)
            }, wait);

            if (callNow) {
                result = fn.apply(context, args)
                console.log('execute success');
            };
        } else {
            timeout = setTimeout(() => {
                fn.apply(context, args);
            }, wait);
        }
        return result;
    }

    debounceProMax.cancel = function () {
        clearTimeout(timeout);
        timeout = null;

    }
    return debounceProMax;
}