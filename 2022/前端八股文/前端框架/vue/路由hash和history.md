# vue的history和hash模式？

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