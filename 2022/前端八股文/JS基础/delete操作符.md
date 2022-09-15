#  delete操作符
+ 从MDN的这个介绍我们可以知道，delete操作符一般是用于对象的，它是用来删除对象上的属性的；而你使用了delete操作符之后，并不是立刻就会释放这个属性的引用，它只是把这个属性和这个对象解除绑定
+ delete操作符可以删除对象的属性，但删除不了原型链中的变量
    - `let a = { a: 1}; delete a.a; console.log(a.a, a)` // undefined, {}
+ delete无法删除变量、无法删除常数的变量
+ 