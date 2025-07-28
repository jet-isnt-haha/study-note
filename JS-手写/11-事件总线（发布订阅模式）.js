class EventEmitter {
    constructor() {
        this.cache = {};
    }
    on(name, fn) {
        if (this.cache[name]) {
            this.cache[name].push(fn)
        } else {
            this.cache[name] = [fn];
        }
    }
    off(name, fn) {
        let task = this.cache[name];
        if (task) {
            const index = task.findIndex(f => f === fn || f.callback === fn);
            if (index >= 0) {
                task.splice(index, 1);
            }
        }
    }
    emit(name, once = false, ...args) {
        if (this.cache[name]) {
            //创建副本，如果回调函数内继续注册相同事件，会造成死循环
            let tasks = this.cache[name].slice();
            for (let fn of tasks) {
                fn(...args);
            }
            if (once) {
                delete this.cache[name];
            }
        }
    }
}
// 测试
let eventBus = new EventEmitter()
let fn1 = function (name, age) {
    console.log(`${name} ${age}`)
}
let fn2 = function (name, age) {
    console.log(`hello, ${name} ${age}`)
}
eventBus.on('aaa', fn1)
eventBus.on('aaa', fn2)
eventBus.emit('aaa', false, 'jet', 12)
// 'jet 12'
// 'hello, jet 12'