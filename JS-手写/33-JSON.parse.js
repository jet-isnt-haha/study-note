

//! eval实现
{
    let json = '{"a":"1","b":2}';
    // let obj = eval("(" + json + ")");
    // console.log(obj);

    //! 直接调用eval会存在安全问题，如果数据中可能不是json数据，而是可执行的JavaScript代码，那很可能会造成XSS攻击。因此，在调用eval之前，需要对数据进行校验。
    var rx_one = /^[\],:{}\s]*$/;
    var rx_two = /\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g;
    var rx_three = /"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g;
    var rx_four = /(?:^|:|,)(?:\s*\[)+/g;
    if (
        rx_one.test(
            json.replace(rx_two, "@")
        )
    ) {
        var obj = eval("(" + json + ")");
    }
}


//! new Function 实现
{
    let json = '{"name":"jet","age":20}';
    let obj = (new Function('return ' + json))();
    console.log(obj);
}