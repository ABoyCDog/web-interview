# 构造函数
+ 创建新对象初始化的函数叫做构造函数

# 实例（对象）
+ 使用new操作符调用构造函数创建出来的对象叫做实例，或是实例对象

# prototype属性
+ prototype 属性也叫做原型属性，是函数独有的，每个函数都有一个prototype属性，他是一个指针，指向一个对象，这个对象包含了所有实例共享的属性和方法

# 原型对象
+ prototype属性指向的对象称为原型对象

# __proto__属性
+ 实例对象都有__proto__属性，它指向该实例对象对应的原型对象

## prototype与__proto__的联系
+ prototype和__proto__都指向原型对象，
+ 任意一个函数（包括构造函数）都有prototype属性，指向该函数的原型对象
+ 任意一个构造函数实例化的对象都有一个__proto__对象，它指向构造函数的原型对象

## prototype和__proto__的区别 
+ prototype是函数独有的，而__proto__是每个对象都有的（包括函数）
+ prototype的作用是保存所有实例公共的属性和方法; __proto__的作用是当访问一个对象的属性时,如果内部没有该属性,就会在它的__proto__属性所指的那个父对象去找,父对象没有,再去父对象的父对象里找…直到null,即原型链.
+ s.__proto__ === Student.prototype
+ Student.prototype.constructor === Student


```js
    class Student {
        constructor(name) {
            this.name = name;
            return this;
        }

        sayName() {
            console.log('My name is ' + this.name + '.')
            return this; // 为了链式调用
        }

        eat(params) {
            console.log("I'm eat " + params + '!');
            return this;
        }
    }

    const s = new Student('小明');

    console.log(s.sayName().eat('Apple'))
    console.log(s.__proto__ === Student.prototype);
    console.log(Student.prototype.constructor === Student)
```


