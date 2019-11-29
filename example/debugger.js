// 要使用它，请使用 inspect 参数启动 Node.js，然后使用要调试的脚本的路径。 将显示一个提示，表明调试器成功启动

setTimeout(() => {
    debugger;
    console.log('世界');
}, 1000);
console.log('你好');

/*
    cont, c - 继续执行。
    next, n - 下一步。
    step, s - 步进。
    out, o - 步出。
    pause - 暂停正在运行的代码（类似开发者工具中的暂停按钮）

    run - 运行脚本（在调试器启动时自动运行）。
    restart - 重启脚本。
    kill - 杀死脚本。
* */
