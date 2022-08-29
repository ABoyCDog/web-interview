# v-if和v-for优先级
+ 在vue2源码中compiler/codegen中可以看到，genElement中处理AST时，先判断静态资源再判断once，然后判断for再判断if、children、slot等，所以for的优先级大于if
+ 如果同时出现，每次渲染都会先执行循环再判断条件，无论如何循环是避免不了的，浪费了性能，所以还是需要分开写。
  - 解决办法一般是在外层套一个template用作条件判断
  - 另外也可以在计算属性中将需要循环的内容提前进行判断的条件过滤
