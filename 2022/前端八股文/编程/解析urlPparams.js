// 解析URL Params为对象
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
