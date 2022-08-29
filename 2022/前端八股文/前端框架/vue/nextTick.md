# nextTick？

+ 
+ 在下次DOM更新循环之后执行延迟回调，nextTick主要使用了宏任务和微任务，根据执行环境分别尝试采用promise，mutationObserver，setImmediate定义一个异步方法，多次调用nextTick会将方法存入任务队列中，通过异步方法清空当前队列