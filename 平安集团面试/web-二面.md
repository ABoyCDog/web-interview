## 1、React 项目中如何与 redux 关联？内部机制？

## 2、webpack 优化方式？

## 3、webpack chunk 是什么？如何分割 chunk？

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

## 10、vue data 为什么需要函数创建？

  由js本身特性决定的。

  举个例子,创建三个变量并赋值调用同一个abc()方法，也就是创建了三个不一样的实例，所以abc返回的值是返回给了不同的地址，因此三个变量的内存地址是不同的，此时改变一个值，其他两个值是不会随之改变的。<br>
  如果是对象，就是创建在原型链，vue实例就会都共享这个data对象，或者可以说是都指向同一个内存地址，其中一个改变，别的vue实例的data也会跟着改变；
  
  而如果data是函数就不一样，使用函数再返回一个对象，此时对象是指向不同地址的，因而创建不同组件的时候，会return出不同地址的对象，就不会出现使用对象的问题，不会因为别的vue实例改变而改变。

## 11、vue nextTick？
