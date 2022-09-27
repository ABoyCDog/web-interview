## 什么是JSBridge？
+ H5会经常需要使用Native的功能，比如打开二维码扫描、调用原生页面、获取用户信息等；
+ 同时Native也需要向Web端发送推送、更新状态等；
+ 而JavaScript是运行在单独的JS Context中（Webview容器、JSCore等），与原生有运行环境的隔离，所以需要有一种机制实现Native端和Web端的双向通信，这就是JSBridge：以JavaScript引擎或Webview容器作为媒介，通过协定协议进行通信，实现Native端和Web端双向通信的一种机制。
    ![image](https://pic1.zhimg.com/80/v2-12533d25238d80bf866154738583acb8_1440w.jpg)

## 什么是webview？
+ webview是移动端提供的一种JS运行环境，是系统渲染web的一个控件，可与页面的JavaScript交互；
+ Android低版本和高版本使用了不同的webkit内核，4.4后直接用了chrome；
+ iOS中的UIWebview是IOS2自带的，但性能较差，IOS8以后使用WKWebview,性能更好；
+ WebView控件除了能加载指定的url外，还可以对URL请求、JavaScript的对话框、加载进度、页面交互进行强大的处理，之后会提到拦截请求、执行JS脚本都依赖于此；

## JSBridge实现原理
+ web端和native可以类比 Client/Server 模式，web端调用一个接口就比如client向server端发送一个请求类似，JSB在这充当了一个类似HTTP协议的角色，所以实现JSB主要有两点：
    1. 将JS接口封装成Native原生接口；
    2. 将Native原生接口封装成JS接口；

    - Native -> Web
        + 
    - Web -> Native
        + 

## 开源的JSBridge
+ JSB的完整实现还是比较麻烦的，目前比较主流的主要有
    1. DSBridge，通过注入API的形式；
    2. JsBridge，通过拦截URL Schema；