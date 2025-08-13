//! 迭代器模式是指提供一种方法顺序访问一个聚合对象中的各个元素，而又不需要暴露该对象的内部表示。迭代器模式可以把迭代过程从业务逻辑中分离出来，在使用迭代器模式之后，即使不关心对象的内部构造，也可以按顺序访问其中的每个元素。

//1.实现自己的迭代器
{
    let each = function (ary, callback) {
        for (let i = 0, l = ary.length; i < l; ++i) {
            callback.call(ary[i], i, ary[i]);
        }
    }

    each([1, 2, 3], function (index, value) {
        console.log([index, value]);
    })


}


console.log('1---------------------------------------------------');

//2.内部迭代器和外部迭代器
{
    //1实现的内部迭代器 

    //外部迭代器必须显式地请求迭代下一个元素
    //外部迭代器增加了一些调用的复杂度，但相对也增强了迭代器的灵活性，外我们可以手工控制迭代的过程或者顺序

    //外部迭代器的实现：
    let Iterator = function (obj) {
        let current = 0;
        let next = function () {
            current += 1;
        }

        let isDone = function () {
            return current >= obj.length;
        }

        let getCurrentItem = function () {
            return obj[current];
        }

        return {
            next,
            isDone,
            getCurrentItem,
            length: obj.length
        }
    }


    let compare = function (iterator1, iterator2) {
        if (iterator1.length !== iterator2.length) {
            console.log('not equal');
        }

        while (!iterator1.isDone() && !iterator2.isDone()) {
            if (iterator1.getCurrentItem() !== iterator2.getCurrentItem()) {
                throw new Error('not equal');
            }
            iterator1.next();
            iterator2.next();
        }
        console.log('equal!');
    }

    let iterator1 = Iterator([1, 2, 3]);
    let iterator2 = Iterator([1, 2, 3]);
    compare(iterator1, iterator2)
}

console.log('2---------------------------------------------------');

//3.迭代类数组对象和字面量对象
{

    //! 无论是内部迭代器还是外部迭代器，只要被迭代的聚合对象拥有length属性而且可以用下标访问，那它就可以被迭代
}


console.log('3---------------------------------------------------');


//4.倒序迭代器
{
    let reverseEach = function (ary, callback) {
        for (let i = ary.length - 1; i >= 0; --i) {
            callback(i, ary[i])
        }
    }

    reverseEach([0, 1, 2], function (index, value) {
        console.log([index, value]);
    })

}

console.log('4---------------------------------------------------');

//5.中止迭代器
{
    let each = function (ary, callback) {

        for (let i = 0, l = ary.length; i < l; ++i) {
            if (callback(i, ary[i]) === false) {
                break;
            }
        }
    }
    each([1, 2, 3, 4, 5], function (index, value) {
        if (n > 3) {
            return false;
        }
        console.log(n);
    })
}