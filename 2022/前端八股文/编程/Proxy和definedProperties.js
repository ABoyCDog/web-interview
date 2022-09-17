// 题目：修改对象属性，调用时劫持对应属性并改变
// let a = {}
// console.log(a.x) -> 1
// console.log(a.x) -> 2
// console.log(a.x) -> 3

let a = {}

// 1. 使用Object.definedProperty
Object.defineProperties(a, {
    "x": {
        get: function() {
            return ++this.b;
        },
        set: function(val) {
            this.b = val;
        },
    }
})

a.x = 0;
console.log('Object.defineProperties');
console.log(a.x)
console.log(a.x)
console.log(a.x)


// 2. 使用Proxy
a = new Proxy(a, {
    get: function(target, key) {
        if(key === 'x') {
            return target.key = (target.key || 0) + 1;
        }
    }
})

a.x = 0;
console.log('Proxy');
console.log(a.x)
console.log(a.x)
console.log(a.x)