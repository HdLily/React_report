const URL = {
    carousel: 'https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg',
    newalbum: 'https://u.y.qq.com/cgi-bin/musicu.fcg',
    albumInfo: 'https://c.y.qq.com/v8/fcg-bin/fcg_v8_album_info_cp.fcg',
}

// 带参请求
const PARAM = {
    format: 'jsonp',
    inCharset: 'utf-8',
    outCharset: 'utf-8',
    notice: 0
}

const OPTION = {
    prefix: 'callback',
    param: "jsonpCallback"
}

// 成功响应标志
const CODE_SUCCESS = 0;

export { URL, PARAM, OPTION, CODE_SUCCESS };
