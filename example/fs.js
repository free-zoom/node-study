// 文件系统进行交互, 所有文件系统操作都具有同步和异步的形式。
const crypto = require('crypto')
const fs = require('fs');

// 读取文件
// fs.open('config/fs-test.js', 'r', (err, fd) => {
//     if (err) throw err;
//     fs.fstat(fd, (err, stat) => {
//         if (err) throw err;
//         // 使用文件属性。
//         console.log(stat)
//         // 始终关闭文件描述符！
//         // fs.close(fd, (err) => {
//         //     if (err) throw err;
//         // });
//     });
// });

// 读取文件
// fs.readFile('config/fs-test.js', (err, data) => {
//     if(err) return err
//     console.log(data.toString('utf8'))
// })

// // 读取dir
// fs.readdir('example', null,(err, dirs) => {
//     if(err) return err
//     console.log(dirs)
// })

// 监视 filename 的更改，其中 filename 是文件或目录
// fs.rename('config/fs-test.js', 'config/fs-test-rename.js', (err) => {
//     if(err) return err
// })

// 监视 filename 的更改
// fs.watchFile('config/fs-test-rename.js', (eventType,filename) => {
//     console.log(eventType,filename)
// })

// 单次的文件写入,重新写入
// fs.writeFile('config/fs-test-rename.js',"const writeFile = 'ok'",(err,written,string) =>{
//     if(err) return err
//     console.log(written,string)
// })

// 读取信息处理后输出到处另外一个文件
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
// }

// translate()

console.log(fs.createReadStream('config/fs-test.js'))

