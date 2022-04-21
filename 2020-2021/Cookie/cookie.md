# Cookie是什么
`Cookie是服务端发送到用户浏览器并且保存到本地的一小块数据，它会在浏览器下次向同一服务器发起请求时，被携带到服务器上`
### 它的作用
+ 经常用来做一些用户会话状态管理、个性化设置等
+ 前端可以通过 `document.cookie` 访问 `cookie`
+ `cookie是跨域的`，也就是在不同域名中，访问的cookie都是`对应域名下的cookie`

# Cookie与CSRF
### 1、CSRF是什么？
&emsp;&emsp;`CSRF`，中文名叫`跨站请求伪造`，发生的场景就是，用户登陆了a网站，然后跳转到b网站，b网站直接发送一个a网站的请求，进行一些危险操作，就发生了CSRF攻击！

&emsp;&emsp;这时候，懂得这个`CSRF`了吗？我认为一部分同学依然不懂，因为我看过太多这样的描述了！

&emsp;&emsp;因为有这么一些疑惑，为什么在b网站可以仿造a网站的请求？Cookie不是跨域的吗？什么条件下，什么场景下，会发生这样的事情？

&emsp;&emsp;这时候，我们要注意上面我对cookie的定义，在发送一个http请求的时候，携带的cookie是这个http请求域的地址的cookie。也就是我在b网站，发送a网站的一个请求，携带的是a网站域名下的cookie！`很多同学的误解，就是觉得cookie是跨域的，b网站发送任何一个请求，我只能携带b网站域名下的cookie。`

&emsp;&emsp;当然，我们在b网站下，读取cookie的时候，只能读取b网站域名下的cookie，这是cookie的跨域限制。所以要记住，`不要把http请求携带的cookie，和当前域名的访问权限的cookie混淆在一起。`

&emsp;&emsp;还要理解一个点：`CSRF攻击`，仅仅是`利用了http携带cookie的特性进行攻击的`，但是`攻击站点还是无法得到被攻击站点的cookie`。这个和XSS不同，`XSS是直接通过拿到Cookie等信息进行攻击的`。
### 2、Cookie相关特性
在`CSRF攻击中`，就Cookie相关的特性：

> 1、http请求，会自动携带 `cookie` <br> 
> 2、携带的cookie，还是在`http请所在域名的cookie`

### 3、Cookie应对 `CSRF攻击`
+ **方案一：** 放弃Cookie，使用Token

    Token的策略是，一般就是登录的时候，`服务端在response中返回token字段`，然后所有的请求都要把token带进请求头中。

    这是目前`最常用的防御CSRF攻击的策略` 
+ **方案二：** SameSite Cookie

    Cookie的新属性-- `SameSite`,解决CSRF攻击问题。只有当前域名的网站才能发出的http请求，携带这个cookie。
+ **方案三：** 服务端`Referer`验证
    
    `http请求`中带有`Referer`字段,字段代表当前域名，服务端根据字段来判断是否真正的 `"用户"` 的请求
    - 弊端: 如果 `Referer` 字段都伪造了，怎么办？
# Cookie与XSS
### 1、XSS是什么？
&emsp;&emsp;XSS是由于不安全的数据引起的，有可能是表单提交的数据，有可能是页面路径的参数问题。

&emsp;&emsp;CSRF是通过伪造http请求，来达到自己的攻击目的。但是XSS是通过盗取用户的敏感信息而达到攻击的目的。比如本地存储、用户密码、cookie等等。

&emsp;&emsp;比如这个不安全的数据，是一个script标签，那这个script就可以链接任意的js文件，浏览器本地就会执行这个js，那通过js我们能做的东西就太多了：

> 1、比如document.cookie，获取用户信息。<br>
2、比如通过localStorage，获取本地存储的敏感信息（token）。<br>
3、然后只要是这个页面展示的任何信息，我都可以获取。

### 2、Cookie应对XSS攻击
+ **方案一：** `http-only`

    &emsp;&emsp;cookie有一个 `http-only` 属性，表示只能被http请求携带。如果受到XSS攻击，攻击者就无法通过document.cookie 获取到你的 cookie信息
+ **方案二：** `正则校验`

    &emsp;&emsp;XSS由于不安全数据引起的，这些数据的来源一般是`通过表单提交，注入到数据库`。 所以针对前端，只需要将表单数据进行正则校验，通过之后才能提交数据。针对服务端，也需要对接收的数据进行校验，不符合规则不能入库。
+ **方案三：** `数据转义`

    &emsp;&emsp;如果无法保证数据库的数据是安全的，那么就只有对于要展示的页面数据进行转义，比如遇到`script`标签就可以直接`replace`处理，遇到标签标识`<`、`>`添加`\`进行处理。

# Cookie 和 Token 对比
+ 1、cookie可以引起csrf攻击，token在保持用户会话的时候好一点
+ 2、由于http请求携带cookie，当cookie过大的时候，会增大http请求的带宽
+ 3、cookie的特性，导致了cookie面对CSRF攻击的时候，很不安全

# Cookie优化
&emsp;&emsp;从安全方面，尽量的使用token，进行会话保持。

&emsp;&emsp;从http请求的角度，尽可能让cookie的信息少一点，从而使得http请求的体积更小。

&emsp;&emsp;由于cookie的一个常用的作用，是保持用户会话的，所以仅仅在接口请求的时候，使用cookie。

&emsp;&emsp;加载其他资源，比如图片、js、css文件等等，可以托管到CDN上，这样就不会携带cookie，CDN的策略也使得资源加载更快。


`以上内容完全copy`

[传送门](https://juejin.im/post/6844904102544031757)

# Cookie 和 Session
+ **首先，要明白一个点，HTTP协议是 `无状态协议`, 即协议对于事物处理没有记忆能力。意味着要处理后续内容时 如果需要前面的信息，则它必要重传。**

+ **那么对于 `HTTP无状态`的特点，就需要用到Cookie、session等会话跟踪技术**

### 1、session 是什么

+ 原理

    &emsp;&emsp;当客户端请求创建一个 `session` 时,服务器就先检查这个客户端是否已经包含一个 `session` 标识 `-sessionId`.
    - 包含 `sessionId` , 服务器就按照这个标识去`检索session`出来使用，检索不到再`创建新的session`
    - 不包含 `sessionId`，服务器创建一个`session`并生成一个与此`session`相关的`sessionId`

    &emsp;&emsp;`sessionId` 一般是不易被伪造的字符串，这个标识会在本次响应中返回客户端并保存。保存标识的方式`一般还是 使用cookie`。

+ 有效期

    `session`一般再内存中存放，是有有效期的，一般使用 `maxInactiveInterval` 属性设置

+ 四种方法让 `session` 正常工作：
    - 通过 `URL` 传递 `sessionId`
    - 通过 `Cookie` 传递 `sessionId`
    - 通过 `SSL` 传递 `sessionId`
    - 通过 `隐藏表单` 传递 `sessionId` 

+ 区别与联系

    |差异|cookie|session|
    |--|--|--|
    |存储位置|客户端|服务器|
    |数据类型|字符串|对象|
    |访问权限|设置路径则某些地方不能访问|同一用户所有的内容都可以访问|

    <br>
    相同：
        
    + 都是为了解决 `HTTP无状态问题`
    + 都基于 `cookie` 

+ 应用场景

    - 重要状态使用 `session` ,例如用户登录信息；
    - 不重要使用 `cookie`， 例如购物车