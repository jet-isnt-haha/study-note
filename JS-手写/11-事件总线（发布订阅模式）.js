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
// eventBus.on('aaa', fn1)
// eventBus.on('aaa', fn2)
// eventBus.emit('aaa', false, 'jet', 12)
// 'jet 12'
// 'hello, jet 12'



{
    class MyEventBus {
        constructor() {
            this.eventBus = {};
        }

        on(eventName, eventCallback, thisArg) {

            let handlers = this.eventBus[eventName];
            if (!handlers) {
                handlers = [];
                this.eventBus[eventName] = handlers;
            }

            handlers.push({
                eventCallback,
                thisArg
            });

        }

        off(eventName, eventCallback) {
            const handlers = this.eventBus[eventName];
            if (!handlers) return;

            const newHandler = [...handlers];

            for (let i = 0; i < newHandler.length; ++i) {
                const handler = newHandler[i];

                if (handler.eventCallback === eventCallback) {
                    const index = handlers.indexOf(handler);
                    handlers.splice(index, 1);
                }

            }

        }

        emit(eventName, ...payload) {
            const handlers = this.eventBus[eventName];

            if (!handlers) return;

            handlers.forEach(handler => {
                handler.eventCallback.apply(handler.thisArg, payload);
            })

        }
    }

    const eventBus = new MyEventBus();
    // main.js
    eventBus.on("abc", function () {
        console.log("监听abc1", this)
    }, { name: "why" })

    const handleCallback = function () {
        console.log("监听abc2", this)
    }
    eventBus.on("abc", handleCallback, { name: "why" })

    // utils.js
    eventBus.emit("abc", 123)

    // 移除监听
    eventBus.off("abc", handleCallback)
    eventBus.emit("abc", 123)


}
