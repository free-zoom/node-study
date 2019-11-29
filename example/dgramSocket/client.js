const dgram = require('dgram');

let client = dgram.createSocket('udp4');
client.bind(3333, '127.0.0.1');

//开始监听数据包时，触发
client.on('listening', function () {
    console.log('监听开始');
});
// 接受消息
client.on('message', function (msg, rinfo) {
    console.log(msg.toString(),rinfo);
});
// 错误时的回调
client.on('error', function (err) {
    console.log(err);
});

// 给8888端口的UDP发送数据
// client.send('我是客户端', 0, 10, 8888, '127.0.0.1', function (error, bytes) {
//     if (error) {
//         console.log(error);
//     }
//     console.log(`发送了 ${bytes} 个字节数据`);
// })
