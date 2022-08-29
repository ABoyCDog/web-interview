# computed和watch的区别
+ computed是计算属性，watch是侦听器。
    + computed是计算属性，通过其他变量计算得来的一个属性。
        - 例如计算属性a，依赖于变量a和b，只有a或b发生变化时，计算属性a才会改变其值。
        - computed具有缓存。计算属性是基于他的依赖进行的缓存，只有相关的依赖发生改变时才会重新求值，否则如果依赖未更改，多次访问计算属性都会立刻返回之前的计算结果，而不是每次都执行函数。
        - computed中的计算属性是新的，不在data里定义。
        - computed计算属性中不能使用箭头函数，因为computed中使用箭头函数的话，会导致this指向的不是vueComponent(因为箭头函数没有自己的this，而是和上一层作用域共享this，computed的上一层作用域可能就没有了，所以this是undefined)
    + watch 监听某一个特定的变量，当该变量发生变化时，执行对应的函数。
        - watch监听的变量是data中定义的，与计算属性computed不同。
        - 监听复杂数据需要使用深度监听，
+ 最重要的一点是：watch是监听data里定义的值，而computed的计算属性只能在computed内，不能在data中定义，否则会报错(重复定义)，因为computed作为计算属性定义变量并返回对应的结果给这个变量，变量不可被重复定义和赋值。
+ 进行异步操作、开销较大时，建议使用watch或method，而不是使用computed。

# 小程序中如何实现类似vue的computed和watch？
+ 在vue中，computed是一个计算属性,类似于过滤器,对绑定到view的数据进行处理,并监听变化。而watch监听复杂数据类型需用深度监听。这两者都可以在vue上实现检测数据的变化。而微信小程序不同于vue可以使用watch和computed做出相应的改变。小程序中只有函数this.setData()可以检测数据，所以小程序每次数据改变需要检测时都必须手动执行函数才可实现。
+ vue 里是通过 Object.defineProperty 来实现数据变化检测的，给该变量的 setter 里注入所有的绑定操作，就可以在该变量变化时带动其它数据的变化。
+ 在小程序里实现要比 vue 里简单，因为对于 data 里对象来说，vue 要递归的绑定对象里的每一个变量，使之响应式化。但是在微信小程序里，不管是对于对象还是基本类型，只能通过 this.setData() 来改变，这样我们只需检测 data 里面的 key 值的变化，而不用检测 key 值里面的 key 。
