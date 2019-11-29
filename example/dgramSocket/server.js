// dgram 模块提供了 UDP 数据包 socket 的实现

const dgram = require('dgram');
//创建upd套接字
//参数一表示套接字类型，'udp4' 或 'udp6'
//参数二表示事件监听函数，'message' 事件监听器
let server = dgram.createSocket('udp4');

//绑定端口和主机地址
server.bind(8888, '127.0.0.1');

//开始监听数据包时触发,创建 UDP socket 之后被立即触发。
server.on('listening', function () {
    console.log('监听开始');
});

//有新数据包被接收时触发
server.on('message', function (msg, rinfo) {
    //msg表示接收到的数据,rinfo表示远程主机的地址信息
    console.log('接收到的数据 : ', msg.toString(),rinfo);
});

//使用 close() 关闭socket之后触发
server.on('close', function () {
    console.log('关闭');
});

//发生错误时触发
server.on('error', function (err) {
    console.log(err);
});

//发送数据，如果发送数据之前没有绑定过地址和端口，则会随机分配端口。
//参数一表示，要发送的数据 string或buffer
//参数二表示，发送数据的偏移量
//参数三表示，发送数据的字节数
//参数四表示，目标端口
//参数五表示，目标主机名或IP地址
//参数六表示，消息发送完毕后的回调函数

setInterval(function () {
    const a = Math.floor(Math.random() *10)
    let buf = Buffer.from(a.toString())
    //向广播IP发送数据
    //注意客户端监听的端口要与这里的端口一致，不然无法接收到广播
    server.send(buf, 0, buf.length, 3333, '127.0.0.1', function (error, bytes) {
        if (error) {
            console.log(error);
        }
        console.log(`每秒发送一个随机数`);
    });
}, 1000);

