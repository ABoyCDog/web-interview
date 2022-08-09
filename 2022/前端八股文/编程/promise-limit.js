// promise解决并发控制
// 题目：要求并发数限制执行，且其中每有一个请求完成则去将新的推入栈继续请求，直到全部请求完毕

function limitLoad (urls, handler, limit) {
    const sequence = [].concat(urls)
    let promises = []

    promises = sequence.splice(0, limit).map((url, index) => {
        return handler(url).then(() => {
            return index
        })
    })

    // 注意是每一个完成则推入新的，而不是几个一起请求完再去推入栈，所以使用race去找出第一个完成的在继续入栈执行，而不是all
    let p = Promise.race(promises)

    for(let i = 0; i < sequence.length; i++) {
        // 通过链式调用去处理
        p = p.then((res) => {
            promises[res] = handler(sequence[i]).then(() => {
                return res
            })
            return Promise.race(promises)
        })
    }
}

const urls = [{
    info: 'link1',
    time: 3000,
}, {
    info: 'link2',
    time: 3000,
}, {
    info: 'link3',
    time: 3000,
}, {
    info: 'link4',
    time: 3000,
}, {
    info: 'link5',
    time: 3000,
}, {
    info: 'link6',
    time: 3000,
}, {
    info: 'link7',
    time: 3000,
}]

// 设置要执行的任务
function loadImg(url) {
    return new Promise((resolve, reject) => {
        console.log('----' + url.info + ' start!')
        setTimeout(() => {
            console.log(url.info + ' OK !')
            resolve()
        }, url.time)
    })
}

limitLoad(urls, loadImg, 3)

