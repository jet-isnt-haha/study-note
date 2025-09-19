function parseParam(url) {
    const paramsStr = /.+\?(.+)$/.exec(url)[1];
    const paramsArr = paramsStr.split('&');
    let paramsObj = {};

    paramsArr.forEach(param => {
        if (/=/.test(param)) {
            let [key, val] = param.split('=');
            val = decodeURIComponent(val);
            val = /^\d+$/.test(val) ? parseFloat(val) : val;
            if (paramsObj.hasOwnProperty(key)) {
                paramsObj[key] = [].concat(paramsObj[key], val);
            } else {
                paramsObj[key] = val;
            }
            console.log(paramsObj);
        } else {
            paramsObj[param] = true;
        }

    })
    return paramsObj;
}

parseParam('https://www.doubao.com/chat/?channel=google_sem&source=dbweb_google_sem_pinp_hx_pc_01&keywordid=0072509644083&gad_source=1&gad_campaignid=22075624064&gbraid=0AAAAA-pec8NQ0j4ZVbEspGo5F6_RjzumR&gclid=CjwKCAjwl_XBBhAUEiwAWK2hzluaASiTU-ZnyKnxcF99RLp4knudUnNWzt8Yk2fPPd7Xy4J4YPF_dhoC8zIQAvD_BwE&source=jeet666')




//好写的方法
function isNumericString(str) {
    return !isNaN(str) && !isNaN(parseFloat(str));
}

function myGetUrlParams(url) {
    const urlStr = url.split('?')[1];
    const entries = urlStr.split('&');
    let obj = {};
    for (let i = 0, len = entries.length; i < len; ++i) {
        let entry = entries[i].split('=');
        entry[1] = isNumericString(entry[1]) ? parseFloat(entry[1]) : entry[1];
        if (!obj[entry[0]]) {
            obj[entry[0]] = entry[1];
        } else {
            obj[entry[0]] = Array.isArray(obj[entry[0]]) ? [...obj[entry[0]], entry[1]] : [obj[entry[0]], entry[1]]
        }
    }
    console.log(obj);
    return obj
}
myGetUrlParams('https://www.doubao.com/chat/?channel=google_sem&source=dbweb_google_sem_pinp_hx_pc_01&keywordid=0072509644083&gad_source=1&gad_campaignid=22075624064&gbraid=0AAAAA-pec8NQ0j4ZVbEspGo5F6_RjzumR&gclid=CjwKCAjwl_XBBhAUEiwAWK2hzluaASiTU-ZnyKnxcF99RLp4knudUnNWzt8Yk2fPPd7Xy4J4YPF_dhoC8zIQAvD_BwE&source=jeet666&source=jeet667')