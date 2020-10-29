## 1、React 项目中如何与 redux 关联？内部机制？

## 2、webpack 优化方式？

## 3、webpack chunk 是什么？如何分割 chunk？

## 4、redux 为什么需要 dispatch，内部如何处理 dispatch？

## 5、redux 中间件？

## 6、redux 优化方案？

## 7、Middleware 实现自己的项目需要？

## 8、如何在 vue 中使用 react 组件？

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

## 11、vue nextTick？
