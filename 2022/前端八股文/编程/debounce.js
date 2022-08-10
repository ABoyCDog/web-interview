// 防抖 就是设置一个时间间隔，事件触发后等待时间间隔后再去执行函数。如果在这个时间内再次出发，则重新计算

// 简单实现
function _debounce(fn, delay) {
    let timeout;
    return function() {
        let context = this;
        let args = arguments;
        clearTimeout(timeout);
        timeout = setTimeout(function() {
            fn.apply(context, args)
        }, delay);
    }
}

// 设置立即执行
function _debounce(fn, delay, immediate) {
    let timeout, result;

    let __debounce = function() {
        let context = this;
        let args = arguments;
        if(timeout) clearTimeout(timeout);
        if(immediate) {
            // 如果已经执行过，不再执行
            let callNow = !timeout;
            timeout = setTimeout(function() {
                timeout = null;
            }, delay);
            if(callNow) {
                result = fn.apply(context, args);
            }
        } else {
            timeout = setTimeout(function() {
                result = fn.apply(context, args);
            }, delay)
        }
        return result
    }

    __debounce.cancel = function() {
        clearTimeout(timeout);
        timeout = null;
    }

    return __debounce;
}

