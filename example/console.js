// 一个简单的断言测试，用于验证 value 是否为真。 如果不是，则记录 Assertion failed。 如果提供 message，则通过传入所有消息参数来使用 util.format() 格式化错误消息。 输出用作错误消息。
console.assert(true, '什么都不做');
// OK
console.assert(false, '%s 工作', '无法');
// Assertion failed: 无法工作


// 清屏log: console.clear()

console.count('a') // a: 1
console.count('a') // a: 2
console.count('a') // a: 3

console.table([{ a: 1, b: 'Y' }, { a: 'Z', b: 2 }]);



console.time('for_100');
for (let i = 0; i < 100; i++) {}
console.timeEnd('for_100');
