//! 单例模式的定义是：保证一个类仅有一个实例，并提供一个访问它的全局访问点***



/*
    *有一些对象我们往往只需要一个，比如线程池、全局缓存、浏览器中的window对象等
*/

//1.实现单例模式
/* 
    用一个变量来标志当前是否已经为某个类创建过对象，如果是，则在下一次获取该类的实例时，直接返回之前创建的对象
*/
var Singeton = function (name) {
    this.name = name;
}

// Singeton.instance = null;
Singeton.prototype.getName = function () {
    console.log(this.name);
}
/* Singeton.getInstance = function (name) {
    if (!this.instance) {
        this.instance = new Singeton(name);
    }
    return this.instance;
} */

//或者

Singeton.getInstance = (function () {
    var instance = null;
    return function (name) {
        if (!instance) {
            instance = new Singeton(name);
        }
        return instance;
    }
})()


var a = Singeton.getInstance('jet');
var b = Singeton.getInstance('jelly');
console.log(a);
console.log(b);
console.log(a === b);
/*
    ! 以上方式存在一个问题：即增加了这个类的不透明性，Singeton类的使用者必须知道这是一个单例类，偏要使用Singleton.getInstance来获取对象
 */
console.log('1---------------------------------------------------');


//2.透明的单例模式

var CreateDiv = (function () {
    var instance;

    var CreateDiv = function (html) {
        if (instance) {
            return instance;
        }
        this.html = html;
        this.init();
        return instance = this;
    }
    CreateDiv.prototype.init = function () {
        var div = document.createElement('div');
        div.innerHTML = this.html;
        document.body.appendChild(div);
    }

    return CreateDiv;
})()

var c = new CreateDiv('jet');
var d = new CreateDiv('jelly');

console.log(c);
console.log(c === d);

/*
    ! 以上方式同样存在问题：比如代码块内较复杂，不符合单一职责原则等问题
 */

console.log('2---------------------------------------------------');


//3.用代理实现单例模式

var CreateDiv_ = function (html) {
    this.html = html;
    this.init();
}

CreateDiv_.prototype.init = function () {
    var div = document.createElement('div');
    div.innerHTML = this.html;
    document.body.appendChild(div);
}

//引入代理类 

var ProxySingletonCreateDiv = (function () {
    var instance;

    return function (html) {
        if (!instance) {
            instance = new CreateDiv_(html);
        }
        return instance
    }

})()

var e = new ProxySingletonCreateDiv('jet')
var f = new ProxySingletonCreateDiv('jelly')
console.log(e);
console.log(e === f);

// *通过引入代理类，不仅可以实现单例模式，而且可以生成普通的类。

console.log('3---------------------------------------------------');


//4.JavaScript中的单例模式 

/*
    总所周知JS是一门无类语言。生搬单例模式的概念并无意义。在JS中创建对象的方法非常简单。

    ! 单例模式的核心是 确保只有一个实例，并提供全局访问

    在JS中我们经常把全局变量当成单例来使用，为了不污染命名空间有如下的做法
*/

// !使用命名空间

var namespace1 = {
    a: function () {
        console.log(1);
    },
    b: function () {
        console.log(2);
    }
}

//* 或动态的创建命名空间

var MyApp = {}

MyApp.namespace = function (name) {
    const parts = name.split('.');
    let current = MyApp;

    for (const i in parts) {
        if (!current[parts[i]]) {
            current[parts[i]] = {}
        }
        current = current[parts[i]]
    }
}

console.log(MyApp.namespace('dom.style.666'));
console.log(MyApp);


// !使用闭包封装私有变量
var user = (function () {
    //使用下划线来约定私有变量。
    var _name = 'jet',
        _age = 20;

    return {
        getUserInfo: function () {
            return _name + ' ' + _age;
        }
    }
})()

console.log('4---------------------------------------------------');

//5.惰性单例

// !惰性单例是指在需要的时候才创建对象实例。 

//书中举例了qq点击的登录的场景实现

var createLoginLayer = (function () {
    let div;
    return function () {
        if (!div) {
            div = document.createElement('div');
            div.innerHTML = '我是登录浮窗';
            div.style.display = 'none';
            document.body.appendChild(div);
        }
        return div;
    }
})()

document.getElementById('loginBtn').onclick = function () {
    var loginLayer = createLoginLayer();
    loginLayer.style.display = 'block'
}

console.log('');
console.log('');
console.log('');

console.log('5---------------------------------------------------');

//6.通用的惰性单例

// !
var getSingle = function (fn) {
    let result;
    return function () {
        return result || (result = fn.apply(this, arguments));
    }
}