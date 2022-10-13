

## treeshaking
+ esm （为什么不是commonJS，因为它没法动态引入，我们知道import一般都是在代码最上层）
+ sideEffects
+ 

## webpack 包体积
+ 分包
 - catchgroup

## publicPath

## plugins原理

## loader和plugins区别
+ loader
    - 是文件加载器，能够加载资源文件，并对文件进行一些处理，如编译，压缩 等，最终一起打包到指定的文件中。
    - loader 的本质是一个函数
+ plugin 
    - 赋予了webpack各种灵活的功能，如打包优化，资源管理，环境变量，注入等，目的是为了解决loader无法实现的功能。

+ loader运行在项目打包之前；plugins运行在整个项目的编译时期 ![image](https://img2020.cnblogs.com/blog/1273018/202104/1273018-20210430113100614-352256068.png)

## 常用的plugin
+ html-webpack-plugin#
    - 在打包结束后，⾃动生成⼀个 html ⽂文件，并把打包生成的 js 模块引⼊到该 html 中
    - 创建简单的html，用于服务器访问。因为要解决一些缓存的问题，总要自动引入打包的js，如果是多页面，就更会重复使用这个插件来做到自己的html插入自己的js打包文件，使得多页面不相冲突的效果；

+ clean-webpack-plugin#
    - 删除（清理）构建目录

+ mini-css-extract-plugin#
    - 提取 CSS 到一个单独的文件中

+ DefinePlugin#
    - 允许在编译时创建配置的全局对象，是一个 webpack 内置的插件，不需要安装

+ copy-webpack-plugin#
    - 复制文件或目录到执行区域，如 vue 的打包过程中，如果我们将一些文件放到 public 的目录下，那么这个目录会被复制到 dist 文件夹中
    - 复制的规则在 patterns 属性中设置：
        - from：设置从哪一个源中开始复制
        - to：复制到的位置，可以省略，会默认复制到打包的目录下
        - globOptions：设置一些额外的选项，其中可以编写需要忽略的文件

+ optimize-css-assets-webpack-plugin
    - 这个从名称上实际上可以看出端倪,这个就是一个用于优化css资源的插件。