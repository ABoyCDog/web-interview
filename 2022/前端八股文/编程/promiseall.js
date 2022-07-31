// 要注意几点：
//  1、先判断参数是否iterator；
//  2、非promise实例进行Promise.resolve()
//  3、如果全部成功，状态变为 resolved，返回值将组成一个数组传给回调
//  4、只要有一个失败，状态就变为 rejected，返回值将直接传递给回调，且返回值也是新的 Promise 对象



let promisall = function(promise) {
    const iterator = Symbol.iterator;
    if(!promise[iterator]) return;
    let count = 0;
    let resolveArr = [];
    return new Promise((resolve, reject) => {
        for(let i = 0; i < promise.length; i++) {
            if(!(promise[i] instanceof Promise)) {
                promise[i] = Promise.resolve(promise[i]);
            }
            promise[i].then(res => {
                resolveArr[i] = res;
                count++;
                if(count === promise.length) {
                    return resolve(resolveArr);
                }
            }).catch(err => {
                return reject(err);
            })
        }
    });
}
