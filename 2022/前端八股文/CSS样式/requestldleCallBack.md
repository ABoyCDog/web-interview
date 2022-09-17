## 什么是requestldleCallBack？
+ RequestIdleCallback 简单的说，判断一帧有空闲时间，则去执行某个任务。目的是为了解决当任务需要长时间占用主进程，导致更高优先级任务(如动画或事件任务)，无法及时响应，而带来的页面丢帧(卡死)情况。故RequestIdleCallback 定位处理的是: 不重要且不紧急的任务。

## 