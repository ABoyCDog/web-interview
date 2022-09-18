## 什么是Reflect?
+ Reflect对象与Proxy对象一样，也是为了操作对象而提供的新API

1. 将object对象种一些明显属于语言内部的方法放到Reflect对象上。
    + 比如 Object.defineProperty就是属于明显是语言内部的方法
    + 现阶段，某些方法同时部署在Object和Reflect对象上，但未来，一些新方法只会部署在Reflect对象上。所以，从Reflect对象可以拿到语言内部的方法
2. 修改某些 Object 方法的返回结果，使其变得更加合理
    + 比如：Object.defineProperty(obj, name, desc) 在无法定义某个属性时会抛出错误，但 Reflect.defineProperty(obj, name, desc) 会返回false
3. 可以objectc操作变为函数式行为。
    + 比如: name in obj 和 delete obj[name] 等操作都是命令式的，而Reflect.has(obj, name)、Reflect.deleteProperty(obj, name) 则是都将它们变为了函数行为
4. Reflect上的方法和Proxy的方法都是一一对应的，只要是Proxy的方法就都能在Reflect对象上找到对应的方法。
    + Proxy对象可以方便的调用对应的Reflect方法完成默认行为，作为修改的基础。
    + 所以不管Proxy怎么修改默认行为，总能在Reflect获取默认行为。

## reflect对象一共有13个静态方法

- Reflect.apply(target, thisArg, args)
- Reflect.construct(target, args)
- Reflect.get(target, name, receiver)
- Reflect.set(target, name, value, receiver)
- Reflect.defineProperty(target, name, desc)
- Reflect.deleteProperty(target, name)
- Reflect.has(target, name)
- Reflect.ownKeys(target)
- Reflect.isExtensible(target)
- Reflect.preventExtensions(target)
- Reflect.getOwnPropertyDescriptor(target, name)
- Reflect.getPrototypeOf(target)
- Reflect.setPrototypeOf(target, prototype)

## 应用场景
+ 使用Proxy+Reflect实现观察者订阅者模式
    - 观察者模式(Observer Mode) 是指函数会自动观察数据对象，一旦数据对象发生变化，函数就会自动执行。
    - ```js
        const person = observable({
            name: '张三',
            age: 20
        });
        function print() {
            console.log(`${person.name}, ${person.age}`);
        };
        observable(print);
        person.name = '李四';
      ```
      其中person是观察目标，函数print是观察者，一旦person发生改变，print就会自动执行
    - 思路是observable返回原是对象的Proxy代理，拦截赋值操作，触发充当观察者的各个函数