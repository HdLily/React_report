// 封装 Promise
import originJsonp from 'jsonp';
// 封装一个通用的 jsonp
let jsonp = (url, data, option) => {
    return new Promise((resolve, reject) => {
        // 拼接 url 和 data,形成一个新的url （重要！！！）
        originJsonp(buildUrl(url, data), option, (err, data) => {
            if (!err) {
                resolve(data);
            } else {
                reject(err);
            }
        })
    })
}

function buildUrl(url, data) {
    let params = [];
    for (var k in data) {
        params.push(`${k}=${data[k]}`);
    }
    let param = params.join('&');
    if (url.indexOf('?') === -1) {
        url += '?' + param;
    } else {
        url += '&' + param;
    }
    return url;
}

export default jsonp;
