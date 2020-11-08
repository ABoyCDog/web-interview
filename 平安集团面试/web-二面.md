## 1、React 项目中如何与 redux 关联？内部机制？

## 2、webpack 优化方式？

## 3、webpack chunk 是什么？如何分割 chunk？

  1、'chunk'可以理解为模块函数的集合，也就是代码块。通过使用webpack打包处理，可以将代码中的多个入口文件、公共引用文件、异步加载文件等抽离成单独的个体，也就是我们打包后的一个个文件。我们可以利用chunk来提高 打包效率节省加载时间，更合理地利用浏览器的缓存等。

  2、分割chunk，splitChunk。 进行代码分割，分离出如第三方依赖库等可能很久不会变动的内容，其标识变化的摘要哈希contentHash也可能很久不变，意味着我们可以利用本地缓存来避免没必要的重复打包，并利用客户端缓存来避免冗余的客户端加载。主要使用 `splitChunks` 插件来分割。

  ![image](https://pic2.zhimg.com/80/v2-42c988ef8901ee74ea640319d63b9809_720w.jpg)

## 4、redux 为什么需要 dispatch，内部如何处理 dispatch？

## 5、redux 中间件？

## 6、redux 优化方案？

## 7、Middleware 实现自己的项目需要？

## 8、如何在 vue 中使用 react 组件？

  <hr>
  vuera插件可以使得vue中使用react组件，react中使用vue组件。
  <hr>

  一、vue使用react组件
  ### `1、安装依赖`

  ```js
    npm install vuera --save
    npm install react react-dom --save
  ```
  ### `2、编辑main.js`
  ```js
    import { VuePlugin } from 'vuera'
    vue.use(VuePlugin)
  ```
  ### `3、加入需要引入的react组件`
  ```js
    import MyReactComponent from './MyReactComponent'
  ```
  ### `4、可能出现的问题`
  ①、vue中没有jsx文件格式问题
  ```js
    // 解决： 编辑webpack.base.conf.js,加入对jsx的支持

    test:  /\.(js|jsx)(\?.*)?$/
  ```
  ②、.babelrc文件中默认引入了transform-vue-jsx，此插件将jsx转义成h function的形式供vue调用
  ```js
    // 解决：
    // 引入插件

    npm install --save-dev babel-plugin-transform-react-js
    
    // 并且在.babelrc文件中
    // 用transform-react-jsx替换transform-vue-jsx

    "plugins": ["transform-react-jsx"]
  ```
  ![image text](https://upload-images.jianshu.io/upload_images/2979086-888b19126c32374a.png?imageMogr2/auto-orient/strip|imageView2/2/w/1200/format/webp)

  ![image](https://upload-images.jianshu.io/upload_images/2979086-702e961d83f176a3.png?imageMogr2/auto-orient/strip|imageView2/2/w/514/format/webp)

  ![image text](https://upload-images.jianshu.io/upload_images/2979086-751846c73de9c581.png?imageMogr2/auto-orient/strip|imageView2/2/w/662/format/webp)

  二、react中使用vue组件
  ```js
  // 安装依赖
  npm install vuera --save
  npm install vue --save
  ```

## 9、vue proxy？

vue-cli2 使用 proxyTable 字段，vue-cli3 使用 proxy 字段(位于 vue.config.js)，一般是在 devServer 内设置；

```js
  proxy: {
    '/api': '', // 此处不能为空，否则运行时会报错'upgrade'相关的错误
    changeOrigin: true,
    // secure: true, // 如果是 https 接口，则需要配置这个参数
    pathRewrite: {
      '^/api': ''
    }
  }
```

proxy代理的原理：

  要解决跨域，首先知道跨域是违反了同源策略的，同源策略就是协议域名端口都要一致的。
  
  那么要解决跨域，就是要将协议域名端口化不同为相同。通过一些方法设置代理，就是要请求发送或者接受的时候，设置一个中间层，将不同域名转换为相同的。

  ![images](https://img-blog.csdnimg.cn/20200702172509942.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQ1NzI1MDQ2,size_16,color_FFFFFF,t_70)

  vue-cli3的proxy代理解决跨域问题，和ES6的Proxy构造函数有什么关系，是怎么实现的？未完待续。。。

## 10、vue data 为什么需要函数创建？

  由js本身特性决定的。

  举个例子,创建三个变量并赋值调用同一个abc()方法，也就是创建了三个不一样的实例，所以abc返回的值是返回给了不同的地址，因此三个变量的内存地址是不同的，此时改变一个值，其他两个值是不会随之改变的。<br>
  如果是对象，就是创建在原型链，vue实例就会都共享这个data对象，或者可以说是都指向同一个内存地址，其中一个改变，别的vue实例的data也会跟着改变；
  
  而如果data是函数就不一样，使用函数再返回一个对象，此时对象是指向不同地址的，因而创建不同组件的时候，会return出不同地址的对象，就不会出现使用对象的问题，不会因为别的vue实例改变而改变。

## 11、vue nextTick？

  nextTick就是用来延迟执行js代码的，为了获取更新之后的dom。

  `应用场景：`
  
  一、在created钩子函数进行dom操作。由于created()钩子函数中还未对dom进行任何渲染，所以无法直接进行dom操作，此时就需要&nextTick()函数来完成。

  > `注意`：在created()中进行dom操作，不使用&nextTick()会报错。

  二、更新数据之后，想要使用js对新的视图进行操作时。

  三、使用一些第三方插件时，插件需要dom变化之后再重新应用该插件，这时就需要&nextTick()来重新启用该插件。

  `原理：`

  一、

## 12、为什么js是单线程语言？

  js语言的一大特点就是单线程，也就是同一时间内只能干一件事情。那么为什么不能多线程？效率不是会更高吗？

  js单线程是与他的用途有关的。js作为一门浏览器的脚本语言，主要用途就是与用户互动，以及操作dom。
  
  这就决定了它只能是单线程，否则会带来很复杂的同步问题。
  
  比如，js有两个线程，那么现在一个线程要在一个dom节点添加内容，但是同时另一个线程要删除这个dom节点，那么浏览器该怎么执行呢？该以哪个线程为准？所以为了避免这种复杂性，从一诞生就是单线程，以后也是。

  `但是，` 为了利用cpu的多核计算能力， HTML5提出新标准，允许js脚本创建多线程，但是子线程完全受主线程的控制，且不得操作DOM。所以这个新标准并没有改变JS的单线程本质特性。
