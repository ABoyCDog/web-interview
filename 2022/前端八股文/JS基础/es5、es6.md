# 5. ES5、ES6区别，以及其分别如何实现继承（JS原型链）
+ ES5: ECMAScript5，第五次修订，2009年完成标准化。
+ ES6: ECMAScript6，第六次修订，2015年完成标准化。
+ ES6新增的一些特性：
    1. let声明变量、const声明常量，两个都是块级作用域。而ES5中的var则是有变量提升的（变量可以先使用后定义，先使用的值为undefined）
    ```js
        //变量提升的问题
        var tem=new Date();
        //函数f 输出tem   var命令会发生“变量提升”现象  
        //局部变量优先高于全局变量 var tem="hello word" 变量提升会覆盖var tem=new Date();
        //同时你先使用为定义  所以值为undefined
        function f(){
        //即变量可以在声明之前使用，值为undefined 
            console.log(tem);
            if(false){
                var tem="hello word"
            }
        }

        f()   //输出undeifined
    ```
    2. 箭头函数： ES6使用不再使用关键字function定义函数，转而使用箭头函数 ()=> 来定义。
        - 箭头函数没有prototype属性
        - 没有自己的this指向
        - 不能使用arguments参数
        - 不能被new
    3. 模版字符串：
    4. promise：
    5. map和set：
    6. 解构：
    7. class类：
    8. 模块化：
+ 继承：