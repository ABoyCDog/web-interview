function timeoutWrapper(p, timeout = 2000) {
    const wait = new Promise((resolve, reject) => {
      setTimeout(() => {
        reject('请求超时')
      }, timeout)
    })
    return Promise.race([p, wait])
  }
