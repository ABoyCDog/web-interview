# vue常见八股文

## 1、keep-alive？
+ 

## 2、nextTick？

+ 
+ 在下次DOM更新循环之后执行延迟回调，nextTick主要使用了宏任务和微任务，根据执行环境分别尝试采用promise，mutationObserver，setImmediate定义一个异步方法，多次调用nextTick会将方法存入任务队列中，通过异步方法清空当前队列

## 3、vue2和vue3的双向数据绑定原理？
+ vue2
  + 
+ vue3
  + 

## 4、v-if和v-show的区别？
+ v-if是真正的条件渲染，条件满足时才会在初始渲染时渲染对应的条件块，否则什么也不做；是惰性的；它会确保在切换过程中条件块内的事件监听器和子组件适当地被销毁和重建。
  + v-if是通过控制vue的虚拟dom节点，来联动控制真实dom上的节点，从而控制元素的显隐。
+ v-show 还是会渲染元素，但是只是做了相当于 display:none; 的操作。
+ 所以v-if一般用于很少改变条件的情况，不需要频繁切换条件的场景，也适用于一些非必要的元素在页面初始化时不渲染从而提升页面加载速度；v-show则适用与频繁切换条件的场景。

## 5、vue的history和hash模式？

+ 背景知识
  + 路由模块的本质就是建立起url与页面的映射关系。
  + 前端路由的核心就是在改变视图的同时不会向后端发送请求。
  + hash和history改变URL的同时不会重新加载页面和发送请求。
  + 早期的路由用window.location.hash来实现，获取url中#及其后面的参数
  + vue中默认是用hash模式
  
+ hash模式：在浏览器中符号#、以及#后面的字符统称为hash。
  + url中有#
  + 原理是onhashchange事件
  + 仅hash符号#之前的内容会被包含在请求中
  + hash修改的url是同文档的url
  + hash只有设置了不同的hash才会修改历史记录栈，因为是通过onhashchange来触发的
  + 生成二维码、微信分享页面的时候都会自动过滤#后面的参数
  + 对服务端安全无用；
  + hash不会重加载页面

+ 设置锚点方法：
```js
step1：设置一个锚点<a href="#print">定位到print位置
step2：在页面需要定位的内容加上id="print"。例如：<div id="print"></div> 然后js操作该id
```

+ history模式：
  + url中没有#，美观
  + 原理是popstate事件，浏览历史（即history对象）出现变化时，就会触发popstate事件。history.pushState用于在浏览历史中添加历史记录，history.replaceState修改浏览记录中的当前记录，但不会触发页面重载刷新(这里注意pushState是向记录栈push，length会+1；而replaceState是修改当前记录，length不变)
  + 全路径内容会被包含在请求中
  + history修改的url可以是同域的任意url
  + history会修改历史记录栈（即使是使用pushState方法设置了相同的URL也会向历史记录栈中添加记录）
  + 刷新会出现404，所以部署线上环境时需要和后端商量重定向问题。

+ 刷新时，history的弊端就出来了，会向后端发送请求，而如果通过history模式改变的url不存在的话是会出现404的；而hash就不会，因为请求中url不会携带#hash