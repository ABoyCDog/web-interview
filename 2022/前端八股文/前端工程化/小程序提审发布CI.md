# 背景 
一些的团队开发微信小程序时，通过微信开发者工具压缩代码，然后提交到微信后台，设置为体验版，然后让测试同学参与测试。

但是当人数变多，迭代变多，发布的小程序变多，这种机械性的工作就会比较繁琐，所以构建CI流水线提审发布是比较有必要的。

# 思路
1. 可以是微信官方提供的miniprogram-ci，加上Jenkins（或者是其他的CI/CD工具）任务实现

https://juejin.cn/post/7105018197698412558

2. 另一个有意思的方案，并不是利用 miniprogram-ci 的 api ，而是用服务器命令执行的方式，模拟了一个微信开发者工具的调用，从而也实现了自动化的构建预览和上传。

# 核心原理
这里主要讲第一种，miniprogram-ci加上Jenkins的方案
1. 利用nodejs调用miniprogram-ci包提供的api
2. 利用jenkins执行自己封装的脚本
3. 调用预览的api，打包预览的二维码，以实现多个版本的代码本地测试
4. 调用上传的api，自动提交代码至微信后台，以便提审
5. 

# vuex与vue的响应式例子有什么关系
我们也可以通过vuex实现同样的功能。vuex中的四部分与vue的对应关系：
+ state--->data、
+ mutations--->methods、
+ getters--->computed、actions：为了处理异步，不能直接更新state，需要借助mutations。