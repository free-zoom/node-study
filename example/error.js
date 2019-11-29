
// throw error
// try ...catch

try {
    const m = 1;
    const n = m + z;
} catch (err) {
    // 在这里处理错误。
    console.log(err)
}


class customError extends Error{
    constructor(params){
        super()
        this.name = params.name && params.name || 'Error'
        this.message = params.message && params.message || 'Message'
        this.code = params.code && params.code || 'Code'

    }
}

const error = new customError({
    name: 'customError',
    message: '注意，生成一个报错信息咯',
    code: '10000'
})

console.log(error.name)
console.log(error.message)
console.log(error.code)
console.log(error.stack)
