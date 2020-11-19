## 1、React 项目中如何与 redux 关联？内部机制？

## 2、webpack 优化方式？

[传送门](https://www.cnblogs.com/wangjiachen666/p/11561186.html)

一、提高 webpack 打包速度

- 1.1、优化 Loader 搜索范围

  对于 loader 来说，影响打包效率的首当其冲是 `babel`, 因为 babel 会将代码转化为字符串 生成 `AST`，再对 AST 继续转变再生成新的代码，项目越大，转换代码越多，效率越低。

  优化的话，第一就是优化 loader 的文件搜索范围，使用 loader 时指定哪些文件不通过 loader 处理，或者指定哪些文件通过 loader 处理：

  ```js
  module.exports = {
  	module: {
  		rules: [
  			{
  				test: /\.js$/,
  				use: ["babel-loader"],
  				// 处理src文件夹下的文件
  				include: path.resolve("src"),
  				// 不处理node_modules下的文件
  				exclude: /node_modules/,
  			},
  		],
  	},
  };
  ```

  因为对于 babel 来说，我们肯定是希望作用于 js 文件的，而且 node_modules 中的代码都是经过编译的，所以我们也没必要再去处理一次。

  另外，我们还可以将 babel 打包过的文件缓存起来，下次只需要编译更改过的代码文件，这样就可以加速打包时间。

  ```js
  loader: "babel-loader?cacheDirectory=true";
  ```

- 1.2、使用多线程打包

- 1.3、noParse

- 1.4、打包文件分析工具

- 1.5、费时分析

  `speed-measure-webpack-plugin` 打包速度测量插件。插件用于测量 webpack 构建速度，针对性的去优化花费时间长的模块代码。

  ```js
  const SpeedMeasureWebpackPlugin = require("speed-measure-webpack-plugin");
  const smw = new SpeedMeasureWebpackPlugin();
  // 用smw.wrap()包裹webpack的所有配置项
  module.exports = smw.wrap({
  	module: {},
  	plugins: [],
  });
  ```

二、减少 webpack 打包后的文件体积

- 2.1、对图片进行压缩和优化

  压缩：使用压缩插件或者在线压缩

  优化：雪碧图

- 2.2、删除无用的 CSS 样式

- 2.3、使用 CDN 方式加载资源

- 2.4、开启 `Tree Shaking`

- 2.5、按需加载 & 动态加载

## 3、webpack chunk 是什么？如何分割 chunk？

1、'chunk'可以理解为模块函数的集合，也就是代码块。通过使用 webpack 打包处理，可以将代码中的多个入口文件、公共引用文件、异步加载文件等抽离成单独的个体，也就是我们打包后的一个个文件。我们可以利用 chunk 来提高 打包效率节省加载时间，更合理地利用浏览器的缓存等。

2、分割 chunk，splitChunk。 进行代码分割，分离出如第三方依赖库等可能很久不会变动的内容，其标识变化的摘要哈希 contentHash 也可能很久不变，意味着我们可以利用本地缓存来避免没必要的重复打包，并利用客户端缓存来避免冗余的客户端加载。主要使用 `splitChunks` 插件来分割。

![image](https://pic2.zhimg.com/80/v2-42c988ef8901ee74ea640319d63b9809_720w.jpg)

## 4、redux 为什么需要 dispatch，内部如何处理 dispatch？

## 5、redux 中间件？

## 6、redux 优化方案？

## 7、Middleware 实现自己的项目需要？

## 8、如何在 vue 中使用 react 组件？

  <hr>
  vuera插件可以使得vue中使用react组件，react中使用vue组件。
  <hr>

一、vue 使用 react 组件

### `1、安装依赖`

```js
  npm install vuera --save
  npm install react react-dom --save
```

### `2、编辑main.js`

```js
import { VuePlugin } from "vuera";
vue.use(VuePlugin);
```

### `3、加入需要引入的react组件`

```js
import MyReactComponent from "./MyReactComponent";
```

### `4、可能出现的问题`

①、vue 中没有 jsx 文件格式问题

```js
// 解决： 编辑webpack.base.conf.js,加入对jsx的支持

test: /\.(js|jsx)(\?.*)?$/;
```

②、.babelrc 文件中默认引入了 transform-vue-jsx，此插件将 jsx 转义成 h function 的形式供 vue 调用

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

二、react 中使用 vue 组件

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

proxy 代理的原理：

要解决跨域，首先知道跨域是违反了同源策略的，同源策略就是协议域名端口都要一致的。

那么要解决跨域，就是要将协议域名端口化不同为相同。通过一些方法设置代理，就是要请求发送或者接受的时候，设置一个中间层，将不同域名转换为相同的。

![images](https://img-blog.csdnimg.cn/20200702172509942.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQ1NzI1MDQ2,size_16,color_FFFFFF,t_70)

vue-cli3 的 proxy 代理解决跨域问题，和 ES6 的 Proxy 构造函数有什么关系，是怎么实现的？未完待续。。。

## 10、vue data 为什么需要函数创建？

由 js 本身特性决定的。

举个例子,创建三个变量并赋值调用同一个 abc()方法，也就是创建了三个不一样的实例，所以 abc 返回的值是返回给了不同的地址，因此三个变量的内存地址是不同的，此时改变一个值，其他两个值是不会随之改变的。<br>
如果是对象，就是创建在原型链，vue 实例就会都共享这个 data 对象，或者可以说是都指向同一个内存地址，其中一个改变，别的 vue 实例的 data 也会跟着改变；

而如果 data 是函数就不一样，使用函数再返回一个对象，此时对象是指向不同地址的，因而创建不同组件的时候，会 return 出不同地址的对象，就不会出现使用对象的问题，不会因为别的 vue 实例改变而改变。

## 11、vue nextTick？

nextTick 就是用来延迟执行 js 代码的，为了获取更新之后的 dom。

`应用场景：`

一、在 created 钩子函数进行 dom 操作。由于 created()钩子函数中还未对 dom 进行任何渲染，所以无法直接进行 dom 操作，此时就需要&nextTick()函数来完成。

> `注意`：在 created()中进行 dom 操作，不使用&nextTick()会报错。

二、更新数据之后，想要使用 js 对新的视图进行操作时。

三、使用一些第三方插件时，插件需要 dom 变化之后再重新应用该插件，这时就需要&nextTick()来重新启用该插件。

`原理：`

一、

## 12、为什么 js 是单线程语言？

js 语言的一大特点就是单线程，也就是同一时间内只能干一件事情。那么为什么不能多线程？效率不是会更高吗？

js 单线程是与他的用途有关的。js 作为一门浏览器的脚本语言，主要用途就是与用户互动，以及操作 dom。

这就决定了它只能是单线程，否则会带来很复杂的同步问题。

比如，js 有两个线程，那么现在一个线程要在一个 dom 节点添加内容，但是同时另一个线程要删除这个 dom 节点，那么浏览器该怎么执行呢？该以哪个线程为准？所以为了避免这种复杂性，从一诞生就是单线程，以后也是。

`但是，` 为了利用 cpu 的多核计算能力， HTML5 提出新标准，允许 js 脚本创建多线程，但是子线程完全受主线程的控制，且不得操作 DOM。所以这个新标准并没有改变 JS 的单线程本质特性。
