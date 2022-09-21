

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