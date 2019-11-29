// 它可以用来跟踪应用中所有的异步资源(console.log()也是异步操作)
const asyncHooks = require('async_hooks');
const fs = require('fs');
let indent = 0;
const hook = asyncHooks.createHook({
    init(asyncId, type, triggerAsyncId) {
        const eid = asyncHooks.executionAsyncId();
        const indentStr = ' '.repeat(indent);
        fs.writeSync(
            1,
            `${indentStr}${type}(${asyncId}):` +
            ` trigger: ${triggerAsyncId} execution: ${eid}\n`);
    },
    before(asyncId) {
        const indentStr = ' '.repeat(indent);
        fs.writeFileSync('log.out',
            `${indentStr}before:  ${asyncId}\n`, { flag: 'a' });
        indent += 2;
    },
    after(asyncId) {
        indent -= 2;
        const indentStr = ' '.repeat(indent);
        fs.writeFileSync('log.out',
            `${indentStr}after:  ${asyncId}\n`, { flag: 'a' });
    },
    destroy(asyncId) {
        const indentStr = ' '.repeat(indent);
        fs.writeFileSync('log.out',
            `${indentStr}destroy:  ${asyncId}\n`, { flag: 'a' });
    },
});

hook.enable();

// new Promise((resolve) => resolve(true)).then((a) => {});
let server = require('net').createServer((sock) => {
    sock.end('hello world\n');
    // server.close();
});
server.listen(8080, () => fs.writeSync(1, 'server started\n'));


// console.log('钩子能捕捉console.log')

// hook.disable();    // 注意，这里不要disable，否则只能触发init事件

// asyncHooks.executionAsyncId();来获取当前函数的asyncId
// asyncHooks.triggerAsyncId();来获取当前函数调用者的asyncId。
