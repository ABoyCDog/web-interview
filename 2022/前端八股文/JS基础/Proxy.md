## 什么是Proxy？
+ Proxy是es6中新增的一种特性。
+ Proxy用于修改某些操作的默认行为，等同于在语言层面做修改，所以属于一种“元编程”（meta programming），即对编程语言进行编程。
+ Proxy是在目标对象之前做一层拦截，也就是外界访问该对象时，需要通过这层拦截，因此提供了这样一种机制，对于外界的访问可以进行过滤和改写。
+ Proxy原意是代理，所以这里代表由他来“代理”某些操作，可以称为“代理器”。
```js
// 例子
let obj = new Proxy({}, {
    get: function(target, key, receiver) {
        console.log('get params: ', target, key, receiver);
        return Reflect.get(target, key, receiver);
    },
    set: function() {
        console.log('set params: ', target, key, val, receiver);
        return Reflect.set(target, key, val, receiver)
    }
})
```
+ es6提供了Proxy构造函数，用来生成Proxy实例
```js
var proxy = new Proxy(targetObject, handler);
```

+ 注意！要使得Proxy生效，必须是对proxy实例进行操作，而不是对原对象操作
+ Proxy支持的拦截操作一共13种，
    - get、set、has、deleteProperty、ownKeys、getOwnPropertyDescriptor、defineProperty、preventExtensions、getPrototypeOf、isExtensible、setPrototypeOf、apply、construct共13种


## Proxy的应用场景
+ 最常见的就是vue3种数据响应就是使用Proxy对数据变更时的属性进行拦截代理
+ 实现web服务的客户端（Proxy对象可以拦截目标对象的任意属性）
+ 实现数据库的ORM层
+ 
