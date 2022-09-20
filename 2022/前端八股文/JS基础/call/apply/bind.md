# call、apply、bind的区别
+ call和apply都是为了改变某个函数运行时的执行上下文（context）而存在的，换句话说就是改变函数内部的this指向。作用一样，只是接收参数不太一样，apply是接受上下文和数组，call是接收上下文和多个参数
    - func.call(this, arg1, arg2);
    - func.apply(this, [arg1, arg2]);
+ bind