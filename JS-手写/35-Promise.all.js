Promise.all = function (promiseArr) {
    let index = 0, result = [];
    return new Promise((resolve, reject) => {
        promiseArr.forEach((p, i) => {
            Promise.resolve(p).then(val => {
                index++;
                result[i] = val;
                if (index === promiseArr.length) {
                    resolve(result);
                }
            }, err => {
                reject(err);
            })
        })
    })
}


Promise.all = function (promiseArr) {
    let index = 0, result = [];
    return new Promise((resolve, reject) => {
        promiseArr.forEach((p, _index) => {
            Promise.resolve(p).then((value) => {
                index++;
                result[_index] = value;
                if (index === promiseArr.length) {
                    resolve(result)
                }
            }, err => {
                reject(err);
            })
        })
    })
}