# 2020-09-16

## **1、Macrotask 与 Microtask**
  + **Macrotask**
    - Macrotask包含了解析HTML、生成DOM、执行主线程JS代码和其他事件如页面载入、输入、网络事件、定时器事件等。从浏览器的角度，Macrotask代表的都是一些离散的独立的工作。
    - **常见应用**
      > `setTimeout、setinterval、setImmediate、requestAnimationFrame、I/O、UI、rendering`
  
  + **Microtask**
    - Microtask则是为了完成一些更新应用册灰姑娘徐状态的较小的任务，如处理`Promise的回调`和`DOM的修改`，以便让这些任务再浏览器重新渲染之前执行。Microtask 以 异步的方式尽快进行，所以开销会比Macrotask小，并且可以在UI渲染之前执行，避免了不必要的UI渲染。
    - **常见应用**
      > `process.nextTick, Promises, Object.observe, MutationObserver`

  + **总结**
    - microtask微任务优先级要高于macrotask宏任务
    - macrotask总在js代码执行完成且microtask queue清空之后执行
    - js执行代码本身也是一个macrotask
    - microtask queue清空后有可能会重新渲染UI
    - Promise 属于 microtask，setTimeout 属于 Macrotask

  + **总体执行顺序： `常规代码 -> promise -> events 和 setTimeout`**

  + **例子**
    ```js
      async function f1() {
        print(2)
        await print(3);
        await print(3.5);
        print(4)
      }
      new Promise((res, rej) => {
        setTimeout(() => {
          print(8)
        })
        print(7)
        res()
      }).then(() => {
        print(9)
      })
      f1()
    ```
    `macro/micro`相关知识并没说 async、await是哪种，google，"如果await后面的值不是一个 Promise，await 会把该值转换为已正常处理的Promise，然后等待其处理结果。"，所以f1中的执行如下：

    ```js
    async function f1() {
      print(2)
      Promise.resolve(print(3)).then(() => {
        Promise.resolve(print(3.5)).then(() => {
          print(4)
        })
      })
    }
    ```
    `anyway， ie不支持async/await语法`

## **2、typeof null 是'object',历史遗留问题**

## **3、再次实现深拷贝**

  ```js
    // 这个版本还缺少对于循环引用和相同引用的处理
    function cloneDeep(target) {
      // 判断是否对象，基本类型直接返回
      if(!isObject(target)) return target
      // 判断数组
      let isArr = Array.isArray(target)

      let result = isArr ? [] : {}
      const keys = Object.keys(target)
      for(let i = 0; i < keys.length; i++) {
        result[keys[i]] = cloneDeep(target[keys[i]])
      }
      return result
    }
    function isObject(obj) {
      return obj !== null && typeof obj === 'object'
    }
  ```

  ```js
    // 解决循环引用和相同引用的深拷贝
    // 循环引用
    let a ={},b={}
    a.b = b
    b.a = a
    // 相同引用 obj.arr1和obj.arr2相同引用
    let arr = [1,2,3]
    let obj = {arr1:arr, arr2:arr}
    obj.arr1[0] = 233
    console.log(arr,obj) // [233,2,3] {[233,2,3],[233,2,3]}

    function isObject(obj) {
      return obj !== null && typeof obj === 'object'
    }
    function cloneDeep(obj) {
      hashMap = new Map()
      function baseClone(target) {
        if(!isObject(target)) return target

        // 
        if(hashMap.get(target)) return hashMap.get(target)

        let result = Array.isArray(target) ? [] : {}
        let keys = Object.keys(target)
        for(let i = 0; i < keys.length; i++) {
          result[keys[i]] = baseClone(target[keys[i]])
        }
        return result
      }
      return baseClone(obj)
    }

  ```

<br>

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