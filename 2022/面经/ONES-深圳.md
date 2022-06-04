# 笔试
+ 6道题，一个小时。两个算法题，一个很简单（15分），另一个中等难度（30分），4个主观题各15分

1. 给两个字符串A，B，判断A字符串中是否包含B中的所有字符串
+ 有序子串的思路： 如果B是A的子序列，可以使用双指针，先以子串第一个值开始从父串中遍历寻找匹配，存在则将子串的指针移动，而父串中的指针此时没有重置，因为是按顺序的子序列，所以不必重置父串的指针。
```js
    var isSubsequence = function (B, A) {
        if (B.length === 0) return true;
        let i = 0;
        for (let j = 0; j < A.length; j++) {
            if (B[i] === A[j]) i++;
        }
        return i === B.length;
    }
```

+ 无序子串的思路：先对字符串排序，再按照有序的去做
```js
    var isSubsequence = function(s, t) {
        s=s.split('').sort().join('');
        if(s.length === 0) return true
        let sArr = s.split('')
        let tArr = t.split('')
        while(tArr.length > 0) {
            let item = tArr.pop()
            if(item === sArr[sArr.length-1]) {
                sArr.pop()
                if(sArr.length === 0) return true
            }
        }
        return false
    };
```


2. LRU深度遍历数组
+ 定义：LRU 是 Least Recently Used 的缩写，即最近最少使用，是一种常用的页面置换算法，选择内存中最近最久未使用的页面予以淘汰。
+ 使用场景：正如我们所说，如果我们想要实现缓存机制--要满足最近最久未使用的淘汰原则，我们就可以使用LRU算法缓存机制，如vue中的kepp-alive就用到了此算法。
+ 一、数组实现：
    - 思路：维护一个数组，提供get和put方法，并且限制数组元素数量（即缓存数量）
        - get可以标记某个元素是最新使用的，提升到第一项
        - put可以加入一个key-value元素，但是需要判断是否已存在，是否超出限额
    ```js
    // 一般解法，维护一个数组，数组元素为key-value键值对对象，每次获取需要遍历数组
    // 工厂函数，具有两个属性 capacity 保存限量，cache 保存缓存
    let LRUCache = function(capacity){
        this.capacity = capacity;
        this.cache = [];
    }

    // 实现 get 方法
    LRUCache.prototype.get = function (key) {
        let index = this.cache.findIndex((item) => item.key === key);
        if (index === -1) {
            return -1;
        }
        // 删除此元素后插入到数组第一项
        let value = this.cache[index].value;
        this.cache.splice(index, 1);
        this.cache.unshift({
            key,
            value,
        });
        return value;
    };

    // 实现 put 方法
    LRUCache.prototype.put = function (key, value) {
        let index = this.cache.findIndex((item) => item.key === key);
        // 想要插入的数据已经存在了，那么直接提升它就可以
        if (index > -1) {
            this.cache.splice(index, 1);
        } else if (this.cache.length >= this.capacity) {
            // 若已经到达最大限制，先淘汰一个最久没有使用的
            this.cache.pop();
        }
        this.cache.unshift({ key, value });
    };
    ```

+ 二、Map实现：
    - 思路：
    ```js
    // 上述代码来自 LRU 缓存机制-官方
    // 时间复杂度 O(1)，因为 Map 既能保持键值对，还能记住插入顺序。
    var LRUCache = function (capacity) {
        this.cache = new Map();
        this.capacity = capacity;
    };

    LRUCache.prototype.get = function (key) {
        if (this.cache.has(key)) {
            // 存在即更新
            let temp = this.cache.get(key);
            this.cache.delete(key);
            this.cache.set(key, temp);
            return temp;
        }
        return -1;
    };

    LRUCache.prototype.put = function (key, value) {
        if (this.cache.has(key)) {
            // 存在即更新（删除后加入）
            this.cache.delete(key);
        } else if (this.cache.size >= this.capacity) {
            // 不存在即加入
            // 缓存超过最大值，则移除最近没有使用的
            // new Map().keys() 返回一个新的 Iterator 对象
            this.cache.delete(this.cache.keys().next().value);
        }
        this.cache.set(key, value);
    };
    ```

3. 设计一个用户偏好存储，谈一下cookie，sessionStorage，local Storage，indexdb哪种形式好
+ 1、本地存储小容量
    - cookie：主要用于存储用户信息，cookie 的内容可以在自动请求时被传给服务器。
        - 4Kb，请求时传递
    - localStorage：数据一直存在于浏览器内，直到用户清除浏览器缓存为止，所以关闭标签页是不会清除的。
        - 5Mb，永久存储
    - sessionStorage： 属性与 localStorage 相同，只是生命周期不同，他会在标签页关闭时被清除。
        - 5Mb，同标签页生命周期，不同页交换数据。
+ 2、本地存储大容量
    - WebSql 和 IndexDB 主要用于前端 有大容量储存需求的页面上，例如在线编辑浏览器或者网页邮箱等。
    - indexDB，50MB，均可正常使用


4. 组件之间通信不方便，设计一个组件之间的通信方案，并说说为什么这样，以及这个方案的局限性 
+ 常见使用场景可以分为三类：
    1. 父子通信：props / emit；parent / children；attrs/$listeners；provide / inject API； ref
    2. 兄弟通信：Vuex
    3. 跨级通信：Vuex；attrs/listeners；provide / inject API

+ 父传子：一般是通过props属性进行通信，props/$emit
+ 子传父：父组件 A 通过 props 参数向子组件 B 传递数据，B 组件通过emit向 A 组 件 发 送 一 个 事 件 （ 携 带 参 数 数 据 ） ， A 组 件 中 监 听 emit向A组件发送一个事件（携带参数数据），A组件中监听emit向A组件发送一个事件（携带参数数据），A组件中监听emit 触发的事件得到 B 向 A 发送的数据。
+ 兄弟通信：
    - 1、使用事件总线：eventBus，$emit/$on，通过一个类似 App.vue 的实例作为一个模块的事件中心，用它来触发和监听事件，如果把它放在 App.vue 中，就可以很好的实现任何组件中的通信，但是这种方法在项目比较大的时候不太好维护。
    - 2、Vuex 是一个状态管理模式。它采用集中式存储管理应用的所有组件的状态，并以相应的规则保证状态以一种可预测的方式发生变化。
        - Vuex 应用的核心是 store（仓库，一个容器），store 包含着你的应用中大部分的状态 (state)；
    - 3、provide/inject 是 Vue2.2.0 新增 API,这对选项需要一起使用，以允许一个祖先组件向其所有子孙后代注入一个依赖，不论组件层次有多深，并在起上下游关系成立的时间里始终生效。

5. 实现字符括号是否匹配判断([{}])；
+ 方法一：暴力消除法
    - 思路：[]、{}、()成对的出现，我能不能把他们都挨个消除掉，如果最后结果是空字符串，那不就意味着符合题意
    ```js
    const isValid = (s) => {
        while (true) {
            let len = s.length
            // 将字符串按照匹配对，挨个替换为''
            s = s.replace('{}', '').replace('[]', '').replace('()', '')
            // 有两种情况s.length会等于len
            // 1. s匹配完了，变成了空字符串
            // 2. s无法继续匹配，导致其长度和一开始的len一样，比如({],一开始len是3，匹配完还是3，说明不用继续匹配了，结果就是false
            if (s.length === len) {
                return len === 0
            }
        }
    }
    ```
+ 方法二：使用栈解决
    - 思路：栈（后入先出）入栈和出栈恰好是反着来，形成了鲜明的对称性
    - 输入：s = "{[()]}"
    - 第一步：读取ch = {，属于左括号，入栈，此时栈内有{
    - 第二步：读取ch = [，属于左括号，入栈，此时栈内有{[
    - 第三步：读取ch = (，属于左括号，入栈，此时栈内有{[(
    - 第四步：读取ch = )，属于右括号，尝试读取栈顶元素(和)正好匹配，将(出栈，此时栈内还剩{[
    - 第五步：读取ch = ]，属于右括号，尝试读取栈顶元素[和]正好匹配，将[出栈，此时栈内还剩{
    - 第六步：读取ch = }，属于右括号，尝试读取栈顶元素{和}正好匹配，将{出栈，此时栈内还剩''
    - 第七步：栈内只能''，s = "{[()]}"符合有效的括号定义，返回true
    ```js
    const isValid = (s) => {
        // 空字符串符合条件
        if (!s) {
            return true
        }

        const leftToRight = {
            '(': ')',
            '[': ']',
            '{': '}'
        }
        const stack = []

        for (let i = 0, len = s.length; i < len; i++) {
            const ch = s[i]
            // 左括号
            if (leftToRight[ch]) {
            stack.push(ch)
            } else {
            // 右括号开始匹配
            // 1. 如果栈内没有左括号，直接false
            // 2. 有数据但是栈顶元素不是当前的右括号
            if (!stack.length || leftToRight[ stack.pop() ] !== ch) {
                return false
            }
            }
        }

        // 最后检查栈内还有没有元素，有说明还有未匹配则不符合
        return !stack.length
    }


    ```

6. 获取后台返回的节点元素后，使用广度优先算法实现函数，函数返回节点名称
+ 

7. 输出顺序判断及理由（考核运行机制）
+ 

8. 1w+行长列表性能问题，如何优化。
+ 一、分页：首先最简单的肯定是分页处理，首页默认展示第一页数据，滚动请求加载
+ 二、实现虚拟列表：只渲染可视区的 dom 节点，其余不可见的数据卷起来，只会渲染可视区域的 dom 节点，提高渲染性能及流畅性，优点是支持海量数据的渲染；当然也会有缺点：滚动效果相对略差（海量数据与滚动效果的取舍问题就看自己的需求
    - 原理是监听滚动事件，动态更新需要显示的 DOM，并计算出在视图中的位移，这也意味着在滚动过程需要实时计算，有一定成本，所以如果数据量不是很大的情况下，用普通的滚动就行
+ 三、滚动节流，减少服务器压力
+ 四、对于纯展示的不做响应式处理：vue 会通过 Object.defineProperty 对数据进行劫持，来实现视图响应数据的变化，然而有些时候我们的组件就是纯粹的数据展示，不会有任何改变，我们就不需要 Vue 来劫持我们的数据，在大量数据展示的情况下，这能够很明显的减少组件初始化的时间，那如何禁止 vue 劫持我们的数据呢？可以通过 Object.freeze 方法来冻结一个对象，一旦被冻结的对象就再也不能被修改了。
    - exportdefault{ data: =>({ users: {} }), asynccreated { constusers = awaitaxios.get("/api/users"); this.users = Object.freeze(users); } };
+ 五、经验之谈，v-for同时避免使用v-if：
    - vue2中v-for的优先级更高，所以编译过程中会把列表元素全部遍历生成虚拟DOM，再通过v-if的条件判断是否渲染，就会造成性能的浪费。
    - vue3中v-if的优先级更高，就意味着当判断条件是 v-for 遍历的列表中的属性的话，v-if 是拿不到的
    - 所以有时候可以通过计算属性来过滤列表
+ 六、列表使用唯一key
+ 七、无状态的组件用函数时组件，

9. 如何设计状态管理，实现异步的进度封装，如单文件上传、批量上传等
+ 如果是服务端渲染应用，ajax请求较少，其实不太需要状态管理；
+ 状态管理万变不离其宗，就是一个有限状态机，并且状态都可预测，我们使用状态管理，就是在可预测的状态下，反应出不同的页面和元素。所以我们状态管理后的状态是一个很确定的数据结构，我们根据这些准确的数据渲染出正确的页面，所以状态管理的正确性十分重要。所以，集中管理的状态测试是至关重要的。
+ 最终的是要实现异步的进度条封装：主要是可以使用async
    - 1、使用promise封装一个ajax异步请求，
    - 2、前端实现进度条，进度时间计算主要是分情况，一般上传进度都是会有现成的API可以获取，比如axios提供了一个参数 onUploadProgress
        - 如果是单文件上传，实时监听获取上传进度，将进度化为进度条
        - 如果是多文件上传，分两种，主要是按照数量来划分上传进度，计算其上传完成占总量的百分比作为上传进度。

10. spa框架的路由实现机制，两种模式的优缺点，hash模式下如何使用锚点
+ 大型单页应用最显著特点之一就是采用的前端路由跳转子页面系统，通过改变页面的URL，在不重新请求页面的情况下，更新页面视图。
+ 更新视图但是浏览器不重新渲染整个页面，只是重新渲染部分子页面，加载速度快，页面反应灵活，这是 SPA 的优势，这也是前端路由原理的核心，这会给人一种仿佛在操作 APP 一样的感觉，目前在浏览器环境中实现这一功能的方式主要有两种：
    - 利用 URL 的 hash(#)
        - hash模式如何使用锚点：
            - 例如，你的地址为http://localhost:8888/#/abc 那么利用 location.hash 输出的内容就为 #/abc。window有一个专门监听hash的事件叫做onhashchange()
            - step1：设置一个锚点<a href="#print">定位到print位置
            - step2：在页面需要定位的内容加上id="print"。例如：<div id="print"></div> 然后js操作该id
        - 使用hash的优缺点：
            - 优点：1、除了ajax请求和资源加载，不会向服务器发起新请求，减少404的场景；2、兼容性好；3、不需要在服务器端进行设置和开发
            - 缺点：1、服务端无法准确获取路由信息；2、对于有锚点功能的需求会与路由机制发生冲突；
    - 利用 H5 新增方法 History interface
        - 原理是popstate事件，浏览历史（即history对象）出现变化时，就会触发popstate事件。history.pushState用于在浏览历史中添加历史记录，history.replaceState修改浏览记录中的当前记录，但不会触发页面重载刷新(这里注意pushState是向记录栈push，length会+1；而replaceState是修改当前记录，length不变)
        - 优点：1、当发生路由重定向时不会丢失url信息，后端也可以拿到数据；2、可以使用history.state()获取路由信息。
        - 缺点：1、需要服务器端进行开发返回html；2、兼容性不够好；3、history模式url改变时，会向服务器发起请求。


