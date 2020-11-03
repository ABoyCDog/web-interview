## 1、vue 中 data 数据变化后，一直到最终的 UI 呈现的流程 （理解为 vue 的响应式原理）

1、追踪变化<br>
当一个 vue 组件，也就是一个 vue 实例中的 data 数据变化时，如一个 js 对象，Vue 将遍历这个对象所有的 property，也就是属性，并使用 Object.definedProperty 来将这些 property 转变为 getter/setter。Object.definedProperty 是 ES5 的一个无法 shim 的特性，这也是为什么 Vue 不支持 ie8 以及更低版本的浏览器的原因。

    而这些 getter/setter 对于用户来说是不可见的，但是在内部Vue是能够追踪的依赖，在 property 被访问和修改的时候通知变更。

    每一个组件实例都对应一个 watcher 实例，他会在组件渲染的过程中将 ‘接触’ 过的数据 property 记录为依赖。之后当依赖项的 setter 触发时，会通知watcher， 从而使它关联的组件重新渲染。

    ![image](https://cn.vuejs.org/images/data.png)

2、监测变化的注意事项<br>
3、声明响应式 property<br>
4、异步更新队列<br>

## 2、组件复用及优化

## 3、几百个组件，说一说如何将最近未使用 200 个以后的组件进行垃圾回收

思路：双链表，尾指针指向 200 以后的组件进行垃圾回收，前面的复杂度 O(1)；还有数组、Map 等均可实现。

## 4、常用的 web 性能优化

## 5、http 缓存的强缓存和协商缓存

## 6、webpack 优化
