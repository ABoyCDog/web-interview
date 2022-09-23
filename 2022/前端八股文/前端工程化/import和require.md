## 什么是 import ？


## 什么是 require ？


## 共通点
+ import和require都是被模块化使用


## 区别
1. 语法层面
    + require 是 commonJS语法，AMD规范引入，commonJS模块是对象
    + import是es6的一个标准语法（浏览器不支持，本质是使用node中的babel将es6转为es5再执行，import会被转码为require），es6模块不是对象
2. 
    + require是运行时加载整个模块（模块中的方法），生成一个对象，再从对象上读取它的方法（只有在运行时才能得到这个对象，不能在编译时做到静态化），理论上可以用在代码任何地方
    + import是编译时调用，确定模块依赖关系，
