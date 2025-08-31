//!   JSON.stringify([, replacer [, space]) ⽅法是将⼀个 JavaScript 值(对象或者数组)转换为⼀个 JSON，此处模拟实现不考虑第二个参数与第三个参数。

/* 
    ! basic structure
    * undefined -》 undefined（undefined）  boolean -》 false/true（string） 
    * number -》 number（string） otherwise NaN & Infinity
    * symbol -》 undefined（undefined）
    * null -》 null（string）
    * string -》 string（string）
    * NaN & Infinity -》 null（string）
*/

/* 
    ! function
    * function -》 undefined（undefined）
*/

/* 
    ! object structure (!function)
    * 如果有toJSON()方法，那么序列化toJSON()的返回值。
    * 如果属性值中出现了undefined、任意的函数以及symbol值，忽略。
    * 所有以symbol为属性键的属性都会被完全忽略掉。
    * 如果是一个数组：如果属性值中出现了undefined、任意的函数以及symbol，转换成字符串 null。
    * 如果是RegExp对象：返回{}（string）。
    * 如果是Date对象，返回Date的toJSON字符串值。
*/

function myJSONstringify(data) {
    let dataType = typeof data;

    if (dataType !== 'object') {
        let result = data;

        if (Number.isNaN(result) || result === Infinity) {
            return "null";
        } else if (dataType === 'symbol' || dataType === 'function' || dataType === 'undefined') {
            return undefined;
        } else if (dataType === 'string') {
            result = '"' + data + '"';
        }
        return String(result);
    } else if (dataType === 'object') {
        if (data === null) {
            return "null";
        } else if (data.toJSON && typeof data.toJSON === 'function') {
            return myJSONstringify(data.toJSON());
        } else if (data instanceof Array) {
            let result = [];
            data.forEach((item, index) => {
                if (typeof item === 'function' || typeof item === 'undefined' || typeof item === 'symbol') {
                    result[index] = "null";
                } else {
                    return result[index] = myJSONstringify(item);
                }
            })

            result = '[' + result + ']';
            return result.replace(/'/g, '"');
        } else {
            //普通对象
            /**
             * 循环引用抛错
             * symbol key忽略
             * undefined、函数、symbol为属性值，被忽略
             */

            let result = [];
            Object.keys(data).forEach((item, index) => {
                if (typeof item !== 'symbol') {
                    if (data[item] !== undefined && typeof data[item] !== 'function' && typeof data[item] !== 'symbol') {
                        result.push('"' + item + '"' + ":" + myJSONstringify(data[item]));
                    }
                }
            })
            return ("{" + result + "}").replace(/'/g, '"');
        }
    }
}
console.log(myJSONstringify({ name: 'jet', friends: ['jelly', null, undefined, () => { console.log('aaa'), 123, NaN }] }));
console.log(JSON.stringify({ name: 'jet', friends: ['jelly', null, undefined, () => { console.log('aaa'), 123, NaN }] }));
