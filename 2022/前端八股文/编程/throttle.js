// 节流 
// 节流就是限定一个函数在一定时间内只执行一次
// 与防抖的区别在于：debounce是在单位时间后才执行，单位时间内再次触发的话就会重新计算单位时间；
// 而throttle是单位时间内只执行一次，单位时间内多次触发也只执行一次，不会重新计算时间

// - 场景1：onresize、scroll、mousemove、mouseover 等，事件频繁触发，不做限制的话，有可能一秒内执行几十、上百次，如果这些函数内部执行其他操作，特别是 dom 操作，那就特别耗费性能，降低程序运行速度，甚至卡死、奔溃等致命问题。
// - 场景2: 懒加载、滚动加载、加载更多或监听滚动条位置
// - 场景3: 防止高频点击提交，防止表单重复提交

// 简单实现
// - 时间戳
function _throttle(fn, wait) {
    let current;
    let start;
    return function() {
        let context = this;
        let args = arguments;
        current = +new Date();
        if(current - start > wait) {
            fn.apply(context, args);
            start = current;
        }
    }
}

// - 定时器

function _throttle(fn, wait) {
    let timer = null;
    return function() {
        let context = this;
        let args = arguments;
        if(!timer) {
            timer = setTimeout(function() {
                fn.apply(context, args);
                timer = null;
            }, wait)
        }
    }
}

// 优化完整版 结合时间戳与定时器
function _throttle(fn, wait, mustRun) {
    let timer = null;
    let start = 0;

    return function() {
        let context = this;
        let args = Array.prototype.slice.call(arguments);
        let current = +new Date();
        clearTimeout(timer);

        if(!start) {
            start = current;
        }

        // 时间间隔大于既定时间间隔则直接执行函数
        if(current - start > mustRun) {
            fn.apply(context, args);
            start = current;
        } else {
            timer = setTimeout(function() {
                fn.apply(context, args);
            }, wait)
        }
    }
}