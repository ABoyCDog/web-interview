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
+ 



