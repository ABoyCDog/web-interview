# http请求原始报文有哪些
+ 一个http请求可以有四个部分组成：
    1. 请求行
        - 请求行由三部分组成：请求方式、请求资源路径、请求协议版本
        - 请求方式：GET、POST(向特定资源提交数据进行处理请求)、PUT、HEAD、OPTIONS、DELETE、TRACE、CONNECT
    2. 请求头
        - 常见的报文字段：
        - Accept: 客户端期待接收的文件类型
        - Accept Encoding：客户端可以接收的编码格式。压缩为了提高传输速率。
        - Accept Language：客户端期待接收的语言类型
        - Cache-control：强制缓存字段，表示缓存失效，http1.1使用的字段，同时存在时优先级大于Expires
        - Expires：同样是强缓存字段，但是绝对时间，是http1.0使用的字段
        - Content-type：
        - Content-
    3. 空体
    4. 请求正文 
