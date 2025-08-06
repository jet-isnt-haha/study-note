//! 触发高频事件，且N秒内只执行一次

//简单版
{
    function throttle(fn, wait) {
        let timer = null;

        return function () {
            let args = arguments;
            let context = this;

            if (!timer) {
                timer = setTimeout(() => {
                    fn.apply(context, args);
                    timer = null;
                }, wait);
            }
        }
    }
}

/* 
    最终版:支持取消节流;另外通过传入第三个参数,option.leading来表示是否可以立即执行一次，
    option.trailing表示结束调用的时候是否还要执行一次,默认都是true。注意设置时不能同时将leading或
    trailing设置为false
*/

{
    function throttle(fn, wait, option) {
        let timeout, context, args, result;
        let previous = 0;
        if (!options) options = {};

        const later = function () {
            previous = option.leading === false ? 0 : new Date().getTime();
            timeout = null;
            fn.apply(context, args);
            if (!timeout) context = args = null;
        }

        const throttle = function () {
            let now = new Date().getTime();
            if (!previous && options.leading === false) previous = now;
            let remaining = wait - (now - previous);
            context = this;
            args = arguments;

            if (remaining <= 0 || remaining > wait/* remaining > wait：处理系统时间异常（时钟回拨） */) {
                if (timeout) {
                    //if (timeout) { clearTimeout(timeout); ... }：处理定时器未执行时的冲突
                    clearTimeout(timeout);
                    timeout = null;
                }
                previous = now;
                fn.apply(context, args);
                if (!timeout) context = args = null;
            } else if (!timeout && options.trailing !== false) {
                timeout = setTimeout(later, remaining);
            }

        }

        throttle.cancel = function () {
            clearTimeout(timeout);
            previous = 0;
            timeout = null;
        }

        return throttle;
    }

}