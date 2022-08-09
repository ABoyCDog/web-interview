// promise解决并发控制

function limitLoad (urls, handler, limit) {
    const sequence = [].concat(urls)
    let promises = []

    promises = sequence.splice(0, limit).map((url, index) => {
        return handler(url).then(() => {
            return index
        })
    })

    let p = Promise.race(promises)

    for(let i = 0; i < sequence.length; i++) {
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

