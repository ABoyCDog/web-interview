
Apifox应聘笔试题
web前端开发

姓名：刘志庆	开始时间：14:00	结束时间： 

本试题共2页，13道题，答题时长为40分钟。

一、判断题：请用符号“√”，“×”为代表，在括弧里填写判断。
1.Date.parse(new Date())获得的时间戳单位是秒（×	）。
2.http请求返回状态码204表示请求是成功的（√	）。
3.<img style="display:none;" src="http://m.meijiabang.cn/test.png">不会加载test.png（×	）。

二、简述题：请将答案填写在每道题的下划线处。
1.列出你熟悉的es6特性（不少于过5点）。
let/const块级变量声明、Promise、Proxy、Reflect、Set//Map/WeakSet/WeakMap、数据解构、es模块、class类声明等


2.JavaScript有哪几种数据类型？
String、Number、Boolean、Undefined、null、Symbol、BigInt七种基本数据类型，Object、Array引用数据类型

3.css3中transform的作用？
主要用于动态修改元素位置，可用作动画实现、以及元素居中等

三、问答题
1.flex-flow由哪两个属性组成？ 
答：direction、wrap



2.有哪些方式可以显示/隐藏一个DOM元素？ 
答：
1.display:none;  
2.动态设置宽高（不推荐）
3.JS操作DOM元素节点是否渲染；



3.CSS实现水平垂直居中
<div class=”wrap”>
    <div class=”content”></div>
</div> 
答：
方法一：flex
.wrap {
	display:flex;
    justify-content:center;
    align-item:center;
}
.content {...}

方法二：tramsform
.wrap {
    position: absolute;
    top: 50%;
    right: 50%;
    tramsform: translate(-50%, -50%);
}
.content {...}

4.编写一个函数实现对一个js对象进行深度clone。 
答：
function isObj(obj) {
    switch(typeof obj) {
        case 'object': {
            return true;
        },
        case 'function': {
            return true;
        },
        // 默认基本数据类型直接返回
        default: {
            return false;
        }
    }
}

var deepClone = funciton(obj) {
    // 先判断数据类型，基本数据类型则直接进行clone，引用数据类型则区分object、array、function，其中function也可以直接clone，而数组和object则需要再次进行深度遍历，也就是进行递归即可；
    // 对象类型
    if(isObj(obj)) {
        // 进行递归处理
    } else {
        // 直接clone
    }
    // 。。。
}




5.一列数的规则如下: 1、1、2、3、5、8、13、21、34...... 求第30位数是多少， 用递归方式解答。
答：
斐波那契数列
function fibonacci(n) {
    // 小于3都直接返回1
    if(n<3) return 1;
    // 大于3则计算对应的n-1的值在计算最终结果
    return fibonacci(n-1) + fibonacci(n-2);
}
fibonacci(30);




6.编写一个函数来获取url的参数值(最好能用多种方式实现，如正则表示式提取)  var url = http://m.meijiabang.cn/index.html?key0=0&key1=1&key2=2
答：
// 思路：先将URL匹配的第一个？后面的字符串取出来，将字符串以&分割为数组，
// 然后遍历对每一个元素解码并分割为key和value存至对象，如果只有key没有value则设置为null/undefined。

function parseParams(url) {
    let paramsObj = {};
    const paramsStr = /.+\?(.+)$/.exec(url)[1]; // 将？后的字符串取出来
    const paramsArr = paramsStr.split('&'); // 以&分割字符串存至数组
    paramsArr.forEach(param => {
        if (/=/.test(param)) { // 处理有value的参数
            let [key, val] = param.split('=');
            val = decodeURIComponent(val); // 解码
            val = /^\d+$/.test(val) ? parseFloat(val) : val; // 判断是否转为数字

            if (paramsObj.hasOwnProperty(key)) { // 判断是否已经存在key，存在则concat
                paramsObj[key] = [].concat(paramsObj[key], val);
            } else {
                paramsObj[key] = val;
            }
        } else { // 没有value
            paramsObj[param] = true;
        }
    })

    return paramsObj;
}
var url = http://m.meijiabang.cn/index.html?key0=0&key1=1&key2=2;
parseParams(url);




7.请问下面打印出来的结果是？ 
for (var i = 0; i < 3; i++) {
    setTimeout(function() { 
        console.log("a:"+i);
    }, 0);
    console.log("b:"+i);
}
答：
b:0
b:1
b:2
a:3
a:3
a:3