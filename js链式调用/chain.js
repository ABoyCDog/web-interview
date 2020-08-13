// 一
function Class1() {
    console.log('初始化')
}
Class1.prototype.method = function(params) {
    console.log(params)
    return this
}
let c1 = new Class1()
c1.method('第一次调用').method('第二次调用').method('第三次调用')

// 二
let obj = {
    a: function() {
        console.log('a')
        return this
    },
    b: function() {
        console.log('b')
        return this
    }
}
obj.a().b().a().a()

// 三 类
class Math {
    constructor(value) {
        this.hasInit = true
        this.value = value
        if(!value) {
            this.hasInit = false
            this.value = 0
        }
    }
    add() {
        let args = [...arguments]
        let initValue = this.hasInit ? this.value : args.shift()
        const value = args.reduce((prev, curv) => prev + curv, initValue)
        return new Math(value)
    }
    minus() {
        let args = [...arguments]
        let initValue = this.hasInit ? this.value : args.shift()
        const value = args.reduce((prev, curr) => prev - curr, initValue)
        return new Math(value)
    }
    mul() {
        let args = [...arguments]
        let initValue = this.hasInit ? this.value : args.shift()
        const value = args.reduce((prev, curr) => prev * curr, initValue)
        return new Math(value)
    }
    divide() {
        let args = [...arguments]
        let initValue = this.hasInit ? this.value : args.shift()
        const value = args.reduce((prev, curr) => prev / (+curr ? curr : 1), initValue)
        return new Math(value)
    }
}
let test = new Math()
let res = test.add(111,222,333).minus(222,111).mul(3,3).divide(2,3)
console.log(res.value)

// 原型链
Number.prototype.add = function() {
    let _that = this
    _that = [...arguments].reduce((prev, curv) => prev + curv, _that)
    return _that
}
Number.prototype.minus = function() {
    let _that = this
    _that = [...arguments].reduce((prev, curv) => prev - curv, _that)
    return _that
}
Number.prototype.mul = function() {
    let _that = this
    _that = [...arguments].reduce((prev, curv) => prev * curv, _that)
    return _that
}
Number.prototype.divide = function() {
    let _that = this
    _that = [...arguments].reduce((prev, curv) => prev / (+curv ? curv : 1), _that)
    return _that
}
let num = 2
let newNum = num.add(1,2,3).minus(1,2).mul(3,3).divide(2,3)
console.log(newNum)