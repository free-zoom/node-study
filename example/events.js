// 异步事件驱动架构，其中某些类型的对象（又称触发器，Emitter）会触发命名事件来调用函数（又称监听器，Listener）。

const events = require('events');
const myEmitter = new events();

// 监听事件
myEmitter.on('eventHandler', () => {
    console.log('监听到事件');
});

// 触发事件
setTimeout(function(){
    console.log('3秒后触发事件')
    myEmitter.emit('eventHandler');
}, 3000)

// 同步和异步: 监听器函数可以使用setImmediate() 和 process.nextTick() 方法切换到异步的操作模式
myEmitter.on('eventHandler', (a, b) => {
    setImmediate(() => {
        console.log('异步地发生');
    });
});
// 执行一次
myEmitter.once('eventHandler', (a, b) => {
    console.log('只执行一次')
});
