## 1、vue 中 data 数据变化后，一直到最终的 UI 呈现的流程 （理解为 vue 的响应式原理）

##### 1、追踪变化<br>

当一个 vue 组件，也就是一个 vue 实例中的 data 数据变化时，如一个 js 对象，Vue 将遍历这个对象所有的 property，也就是属性，并使用 Object.defineProperty 来将这些 property 转变为 getter/setter。Object.defineProperty 是 ES5 的一个无法 shim 的特性，这也是为什么 Vue 不支持 ie8 以及更低版本的浏览器的原因。

> 而这些 getter/setter 对于用户来说是不可见的，但是在内部 Vue 是能够追踪的依赖，在 property 被访问和修改的时候通知变更。

    每一个组件实例都对应一个 watcher 实例，他会在组件渲染的过程中将 ‘接触’ 过的数据 property 记录为依赖。之后当依赖项的 setter 触发时，会通知watcher， 从而使它关联的组件重新渲染。


![image](https://cn.vuejs.org/images/data.png)

##### 2、监测变化的注意事项<br>

- 1、对象的话

  Vue 无法监测对象 properety 的变化，但可以在初始化实例时将 对象的 `property` 转化为 `setter/getter`，所以 property 必须在 data 对象上存在才能让 Vue 将他转为响应式。

  &emsp;&emsp;由于 js 的限制，Vue 不能检测数组和对象的变化。尽管如此，vue 还是通过其他办法来保证他们的响应性。

  ```js
  var vm = new Vue({
  	data: {
  		a: 1,
  	},
  });

  // `vm.a` 是响应式的

  vm.b = 2;
  // `vm.b` 是非响应式的
  ```

  对于已经创建的实例，Vue 不允许动态添加根级别的响应式 property。但是可以用 `Vue.set(object, propertyName, value)` 方法向嵌套对象添加响应式。[详见](https://cn.vuejs.org/v2/guide/reactivity.html#%E5%AF%B9%E4%BA%8E%E5%AF%B9%E8%B1%A1)

- 2、对于数组

  有两种变动，一是使用索引设置数组项，二是修改数组长度

  ```js
  var vm = new Vue({
  	data: {
  		items: ["a", "b", "c"],
  	},
  });
  vm.items[1] = "x"; // 不是响应性的
  vm.items.length = 2; // 不是响应性的
  ```

  对于第一种问题，可以使用 1、Vue.set() 2、Array.property.splice()
  1、`vm.set(vm.items, indexOfItem, newValue)` 也可以使用 `vm.$set()` 实例方法， 这是全局方法 `vm.set()` 的一个别名
  2、`vm.items.splice(indexOfItem, 1, newValue)`

  这两种都可以实现和 `vm.items[indexOfItem] = newValue` 相同的效果

##### 3、声明响应式 property<br>

##### 4、异步更新队列<br>

## 2、组件复用及优化

## 3、几百个组件，说一说如何将最近未使用 200 个以后的组件进行垃圾回收

思路：双链表，尾指针指向 200 以后的组件进行垃圾回收，前面的复杂度 O(1)；还有数组、Map 等均可实现。

## 4、常用的 web 性能优化

## 5、http 缓存的强缓存和协商缓存

## 6、webpack 优化
