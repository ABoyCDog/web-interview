// 链式调用-实现lazyMan

class _LazyMan {
    constructor(name) {
        this.name = name;
        this.queue = [];
        this.queue.push(() => {
            console.log('Hi! This is ' + name + '!');
            this.next(); // 这一遍执行很重要！！！
        });
        setTimeout(() => {
            this.next();
        }, 0)
    }

    eat (arg) {
        this.queue.push(() => {
            console.log('Eat ' + arg + '~');
            this.next();
        })
        return this;
    }

    sleep (time) {
        this.queue.push(() => {
            setTimeout(() => {
                console.log('Wake up after ' + time + 's!');
                this.next();
            }, time * 1000);
        });
        return this;
    }

    sleepFirst (time) {
        this.queue.unshift(() => {
            setTimeout(() => {
                console.log('Wake up after ' + time + 's!');
                this.next();
            }, time * 1000);
        })
        return this;
    }

    next () {
        let fn = this.queue.shift();
        fn && fn();
    }
}

function LazyMan (name) {
    return new _LazyMan(name);
}

LazyMan('Hank').eat('Apple').sleep(3).eat('Bananer'); //
    


