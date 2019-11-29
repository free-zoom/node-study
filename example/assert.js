// assert 模块提供了一组简单的断言测试，可用于测试不变量。 该模块提供了建议的严格模式和更宽松的遗留模式。
const assert = require('assert');

const obj1 = {
    name: '111',
    parent: {
        mother: '222'
    }
}

const obj2 = {
    name: '111',
    parent: {
        mother: '111'
    }
}

try {
    // assert(0,'不为真');
    // assert.strictEqual(1,'1','不全等');
    assert.deepEqual(obj1,obj2,'深度不相等')
} catch (err) {
    console.log(err)
}
