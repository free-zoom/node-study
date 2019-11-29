// Buffer：用于在 TCP 流、文件系统操作、以及其他上下文中与八位字节流进行交互,Buffer 的大小在创建时确定，且无法更改。
// Buffer 对象占用的内存空间是不计算在 Node.js 进程内存空间限制上的，所以可以用来存储大对象，但是对象的大小还是有限制的。
// 一般情况下32位系统大约是1G，64位系统大约是2G。

// 缓冲（Buffer）

// 是用于处理二进制流数据，将数据缓冲起来，它是临时性的，对于流式数据，会采用缓冲区将数据临时存储起来，等缓冲到一定的大小之后在存入硬盘中。
// 视频播放器就是一个经典的例子，有时你会看到一个缓冲的图标，这意味着此时这一组缓冲区并未填满，当数据到达填满缓冲区并且被处理之后，此时缓冲图标消失，
// 你可以看到一些图像数据。

// 缓存（Cache）

// 缓存（Cache）我们可以看作是一个中间层，它可以是永久性的将热点数据进行缓存，使得访问速度更快，例如我们通过 Memory、Redis 等将数据从硬盘
// 或其它第三方接口中请求过来进行缓存，目的就是将数据存于内存的缓存区中，这样对同一个资源进行访问，速度会更快，也是性能优化一个重要的点。

const Buf = Buffer.from('runoob','ascii')
// 读取数据
console.log(Buf.toString('UTF-8'))
console.log(Buf.toString('Base64'))

// 创建一个长度为 10、且用 0 填充的 Buffer。
const buf1 = Buffer.alloc(10);

// 创建一个包含 UTF-8 字节 [0x74, 0xc3, 0xa9, 0x73, 0x74] 的 Buffer。
const buf2 = Buffer.from('test');
console.log(buf1,buf2)

//写入缓冲区
const buf3 = Buffer.alloc(256);
buf3.write('写入内容')

console.log(buf3.toString('UTF-8'))
