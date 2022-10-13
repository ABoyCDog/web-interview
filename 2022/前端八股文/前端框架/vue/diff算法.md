## diff算法是什么
+ 组件渲染会返回vdom，渲染器通过增删改api同步到dom；
+ 当再次渲染时会长产生新的vdom，渲染器比对两颗vdom，对有差异的部分通过增删改API更新到dom；
+ 对比两棵 vdom 树，找到有差异的部分的算法，就叫做 diff 算法。
+ diff的过程就是调用名为patch的函数，比较新旧节点，一边比较一边给真实的DOM打补丁。

## virtualDOM和真实DOM
+ virtual DOM是将真实的DOM的数据抽取出来，以对象的形式模拟树形结构。
+ 真实DOM：
```js
    <div>
        <span>123</span>
    </div>
```
VDOM：伪代码
```js
    var VNode = {
        tag: 'div',
        children: [
            {
                tag: 'span',
                text: '123'
            }
        ]
    }
```

## diff 流程
+ 当数据发生改变时，set方法会让调用Dep.notify通知所有订阅者Watcher，订阅者就会调用patch给真实的DOM打补丁，更新相应的视图。
+ ![image](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2018/5/19/163777930be304eb~tplv-t2oaga2asx-zoom-in-crop-mark:3024:0:0:0.awebp)

## 实现原理 
+ 两棵树的diff 复杂度是O(n^3)，因为每个节点和另一棵树的全部节点比对为n，有变化的节点进行增删改操作也是n，然后一个节点比对为n那么所有的节点数为n，所以总共就是n*n*n，也就是n^3。如此diff比对消耗太大。
+ 所以 前端框架的 diff 约定了两种处理原则：只做同层的对比，type 变了就不再对比子节点。
+ 减少dom操作


## 简单diff算法
+ diff 算法的目的是根据 key 复用 dom 节点，通过移动节点而不是创建新节点来减少 dom 操作。
+ 对于每个新的 vnode，在旧的 vnode 中根据 key 查找一下，如果没查找到，那就新增 dom 节点，如果查找到了，那就可以复用。
+ 复用的话要不要移动要判断下下标，如果下标在 lastIndex 之后，就不需要移动，因为本来就在后面，反之就需要移动。
+ 最后，把旧的 vnode 中在新 vnode 中没有的节点从 dom 树中删除。
这就是一个完整的 diff 算法的实现。

![image](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ca5c723a59684ad7a846d3ae46539776~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp?)

## 优化的双端diff算法
+ 双端 diff 是头尾指针向中间移动的同时，对比头头、尾尾、头尾、尾头是否可以复用，如果可以的话就移动对应的 dom 节点。
如果头尾没找到可复用节点就遍历 vnode 数组来查找，然后移动对应下标的节点到头部。
最后还剩下旧的 vnode 就批量删除，剩下新的 vnode 就批量新增。

![image](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/de98767a75d04c0598e16738edc204de~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp?)
