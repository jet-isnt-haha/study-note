
const getJSON = function (url) {

    return new Promise((resolve, reject) => {

        const xhr = new XMLHttpRequest();
        xhr.open('GET', url, false);
        xhr.setRequestHeader('Accept', 'application/json');

        xhr.onreadystatechange = function () {
            if (xhr.readyState !== 4) return;
            /* 
                readyState: 
                0-请求未初始化，还没有调用open();
                1-请求已经建立，但是还没有发送，还没有调用send()。
                2-请求已发送，正在处理中（通常现在可以从响应头中获取内容头）、
                3-请求处理中；通常响应中已有部分数据可用了，没有全部完成
                4-响应已完成；您可以获取并使用服务器的响应了
            */
            if (xhr.status === 200 || xhr.status === 304) {
                resolve(xhr.responseText);
            } else {
                reject(new Error(xhr.responseText));
            }
        }
        xhr.send();
    })

}
