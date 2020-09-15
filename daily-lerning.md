# 2020-09-15

## **1、Flow**

  + **(Vue源码解读的前置知识)：** <br>
  [flow官网](https://flow.org/en/docs/getting-started/) <br>
  [知乎flow入门帖子](https://zhuanlan.zhihu.com/p/26204569)

  + 一些笔记
    - `flow是JS代码的静态类型检查器`
    - flow 解译，即编译器剥离flow类型，可使用 `babel` 和 `flow-remove-types`
    - `基本类型的类型标注语法`
      JavaScript 中的基本类型，类型标注语法是在变量后加上一个冒号，空格，然后是相应的类型名称，如：
        ```js
          // @flow
          const a: string = 'zhihu'; 
          const b: number = 5; 
          const c: boolean = false; 
          const d: void = undefined; 
          const e: null = null;
        ```

      > 以上需要注意的几点：
      1. undefined 的类型是 void；
      2. null 的类型是 null；
      3. string 类型、number 类型和 boolean 类型，其类型名称都是小写开头；但是在 JS 中还有相对应的大写开头的类型名称，如 String，Number, Boolean；

    - `在 Flow 中，大写开头的类型名和小写开头的类型名是有区别的。`
      ```js
        // @flow
        const a: string = 'a';             // 字面量值对应的类型名称是小写 
        const b: string = String('b');     // String 函数是将参数转化成一个字符串，仍然是小写的 string 类型 
        const c: String = new String(‘c’); // 大写开头的类型名称，其对应的值是 new 创建出来的类型实例；
      ```

## **2、Macrotask 和 Microtask**

  + 浅析JS的 `Macrotask` 和 `Microtask`

    [传送门](https://segmentfault.com/a/1190000019415672)