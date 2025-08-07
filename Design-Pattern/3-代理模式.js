//! 代理模式是为一个对象提供一个代用品或占位符，以便控制对它的访问。

//1.一个简单的代理模式例子
let Flower = function () { };
let A = {
    receiveFlower: function (flower) {
        console.log('收到 ', flower);
    },
    listenGoodMood: function (fn) {
        setTimeout(() => {
            fn();
        }, 10000);
    }
}
{


    let xiaoming = {
        sendFlower: function (target) {
            let flower = new Flower();
            target.receiveFlower(flower);
        }
    }

    let B = {
        receiveFlower: function (flower) {
            A.listenGoodMood(() => {
                A.receiveFlower(flower);
            })
        }

    }



    xiaoming.sendFlower(B);
}

console.log('1---------------------------------------------------');

//2.保护代理和虚拟代理

{
    //!虚拟代理会把一些开销很大的对象，延迟到真正需要它的时候才去创建

    let B = {
        receiveFlower: function (flower) {
            A.listenGoodMood(() => {//监听A的好心情
                let flower = new Flower(); //延迟创建Flower对象
                A.receiveFlower(flower);
            })
        }

    }

    //保护代理 用于控制不同权限对象对目标对象的访问，但在JavaScript并不容易实现保护代理，因为我们无法判断谁访问了某个对象。
    //而虚拟代理是最常用的一种代理模式
}

console.log('2---------------------------------------------------');


//3.虚拟代理实现图片预加载
{
    let myImage = (function () {
        let imgNode = document.createElement('img');
        document.body.appendChild(imgNode);

        return {
            setSrc: function (src) {
                imgNode.src = src;
            }
        }
    })()

    let proxyImage = (function () {
        let img = new Image;
        img.onload = function () {
            myImage.setSrc(this.src);
        }
        return {
            setSrc: function (src) {
                myImage.setSrc(/* 本地的加载图片 */);
                img.src = src;
            }
        }
    })()

    proxyImage.setSrc(/* 需要网络请求加载的图片 */);

}


console.log('3---------------------------------------------------');


//4.虚拟代理合并HTTP请求

{
    //通过收集一段时间之内的请求，最后一次性发送给服务器以减轻服务器的压力

    let synchronousFile = function (id) {
        console.log('开始同步文件:', id);
    }

    let proxySynchronousFile = (function () {
        let cache = [], //保存一段时间内需要同步的ID
            timer;

        return function (id) {
            cache.push(id);
            if (timer) { //保证不会覆盖已经启动的定时器
                return;
            }

            timer = setTimeout(() => {
                synchronousFile(cache.join(','));//2秒后向本体发送需要同步的ID集合
                clearTimeout(timer);
                timer = null;
                cache.length = 0;//清空ID集合
            }, 2000);
        }
    })

}



// console.log('4---------------------------------------------------');


//5.缓存代理

{
    //! 缓存代理可以为一些开销大的运算结果提供暂时的存储，在下次运算时，如果传递进来的参数跟之前一致，则可以直接返回前面存储的运算结果

    let mult = function () {
        console.log('start');
        let a = 1;
        for (let i = 0, l = arguments.length; i < l; ++i) {
            a = a * arguments[i];
        }
        return a;
    }

    let proxyMult = (function () {
        let cache = [];
        return function () {
            let args = Array.prototype.join.call(arguments, ',');
            if (args in cache) {
                return cache[args];
            }
            return cache[args] = mult.apply(this, arguments);
        }
    })()

    proxyMult(1, 2, 3, 4)
    proxyMult(1, 2, 3, 4)
}