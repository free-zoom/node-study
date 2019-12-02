// 文件系统进行交互, 所有文件系统操作都具有同步和异步的形式。
// 文件描述符: 简化用户的工作，Node.js 抽象出操作系统之间的特定差异，并为所有打开的文件分配一个数字型的文件描述符。
const crypto = require('crypto')
const fs = require('fs');

// 目录流的类: fs.opendir()、fs.opendirSync() 或fs.promise.opendir()
//     fs.opendir('example', (err, dirent) => {
//         if(err) return err
//         console.log(dirent.path)
//     })

// readdir()读取dir
//     fs.readdir('example', (err, files) => {
//         if(err) return err
//         console.log(files)
//         for(let i in files){
//             fs.stat('example/' + files[i],(err,stats) => {
//                 console.log(stats.isFile())
//             })
//         }
//     })

// readdir()读取dir, 返回fs.Dirent类
//     fs.readdir('example', { withFileTypes: true }, (err, files) => {
//         if(err) return err
//         console.log(files)
//         for(let i in files){
//             console.log(files[i].isDirectory())
//             console.log(files[i].name)
//         }
//     })

// 每当指定监视的文件被修改时，将会返回一个新的 fs.FSWatcher 对象
//     fs.watchFile('config/fs-test.js', (eventType,filename) => {
//         console.log(eventType,filename)
//     })

// fs.ReadStream 类
//     const readStream = fs.createReadStream('config/fs-test.js')
//     console.log(readStream.bytesRead)
//     console.log(readStream.path)

// fs.Stats 类
// open()异步打开文件:用于分配新的文件描述符,文件描述符可用于从文件读取数据、向文件写入数据、或请求关于文件的信息
//     fs.open('config/fs-test.js', 'r', (err, fd) => {
//         if (err) throw err;
//         fs.fstat(fd, (err, stat) => {
//             if (err) throw err;
//             // 使用文件属性。
//             console.log(stat)
//             // 始终关闭文件描述符！
//             fs.close(fd, (err) => {
//                 if (err) throw err;
//             });
//         });
//     });

// fs.WriteStream 类
//     const writeStream = fs.createWriteStream('config/test.js')
//     console.log(writeStream.bytesWritten)
//     console.log(writeStream.path)

// fs.access(path,mode,callback)测试用户对 path 指定的文件或目录的权限

// fs.copyFile(src, dest[, flags], callback):异步地将 src 拷贝到 dest,默认情况下将创建或覆盖目标文件。
//     fs.copyFile('源文件.txt', '目标文件.txt', (err) => {
//         if (err) throw err;
//         console.log('源文件已拷贝到目标文件');
//     });

// fs.mkdir(path[, options], callback)


// fs.open(path[, flags[, mode]], callback) ,返回文件描述符，用于文件的读取与写入
// fs.read(fd, buffer, offset, length, position, callback)


// readFile()读取文件内容
// fs.readFile('config/fs-test.js', (err, data) => {
//     if(err) return err
//     console.log(data.toString('utf8'))
// })

// rename()重命名
// fs.rename('config/fs-test.js', 'config/fs-test-rename.js', (err) => {
//     if(err) return err
// })

// fs.write(fd, string[, position[, encoding]], callback)

// writeFile()文件写入内容
// fs.writeFile('config/fs-test-rename.js',"const writeFile = 'ok'",(err,written,string) =>{
//     if(err) return err
//     console.log(written,string)
// })

// 实例：读取信息处理后输出到另外一个文件
// function translate() {
//     fs.readFile('config/fs-test.js', 'utf8', (err, beforData) => {
//         if(err) return err
//         const _beforData = JSON.parse(beforData)
//         let _afterData
//         let resultObj
//         fs.readFile('config/fs-test-translate.js', 'utf8', (err2, afterData) => {
//             if(err2) return err2
//             _afterData = afterData.length > 1 ? JSON.parse(afterData) : {}
//             for(let i in _beforData){
//                 let hashVal,source
//                 const hash = crypto.createHash('sha256')
//                 hash.update(_beforData[i])
//                 hashVal = hash.digest('hex')
//                 source = { [i]: hashVal }
//                 resultObj = Object.assign(_afterData,source)
//                 fs.writeFileSync('config/fs-test-translate.js', JSON.stringify(resultObj,null, '\t'), (err3) => {
//                     if (err3) return err3;
//                 })
//             }
//         })
//     })
// }()


