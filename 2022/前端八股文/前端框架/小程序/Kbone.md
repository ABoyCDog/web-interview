## 什么是Kbone?

Kbone 是一个致力于微信小程序和 Web 端同构的解决方案。

+ 具体来说，因为微信小程序的底层模型和 Web 端不同，所以如果我们想直接把 Web 端的代码挪到小程序环境内执行是不可能的。

+ Kbone 的诞生就是为了解决这个问题，它实现了一个适配器，在适配层里模拟出了浏览器环境，让 Web 端的代码可以不做什么改动便可运行在小程序里。

+ 因为 kbone 是通过提供适配器的方式来实现同构，所以它的优势很明显：
    - 大部分流行的前端框架都能够在 kbone 上运行，比如 Vue、React、Preact 等。
    - 支持更为完整的前端框架特性，因为 kbone 不会对框架底层进行删改（比如 Vue 中的 v-html 指令、Vue-router 插件）。
    - 提供了常用的 dom/bom 接口，让用户代码无需做太大改动便可从 Web 端迁移到小程序端。
    - 在小程序端运行时，仍然可以使用小程序本身的特性（比如像 live-player 内置组件、分包功能）。
    - 提供了一些 Dom 扩展接口，让一些无法完美兼容到小程序端的接口也有替代使用方案（比如 getComputedStyle 接口）。



