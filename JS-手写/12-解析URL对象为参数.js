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

parseParam('https://www.doubao.com/chat/?channel=google_sem&source=dbweb_google_sem_pinp_hx_pc_01&keywordid=172509644083&gad_source=1&gad_campaignid=22075624064&gbraid=0AAAAA-pec8NQ0j4ZVbEspGo5F6_RjzumR&gclid=CjwKCAjwl_XBBhAUEiwAWK2hzluaASiTU-ZnyKnxcF99RLp4knudUnNWzt8Yk2fPPd7Xy4J4YPF_dhoC8zIQAvD_BwE&source=jeet666')