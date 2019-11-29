/*

作用：
    Promise是一种异步请求解决方案，解决了回调地域问题(多层嵌套回调)
    // 使用前
    Parse.User.logIn("user", "pass", {
      success: function(user) {
        query.find({
          success: function(results) {
            results[0].save({ key: value }, {
              success: function(result) {
                // the object was saved.
              }
            });
          }
        });
      }
    });
    // 使用后
    Parse.User.logIn("user", "pass").then(function(user) {
      return query.find();
    }).then(function(results) {
      return results[0].save({ key: value });
    }).then(function(result) {
      // the object was saved.
    });
理解
    new Promise((resolve,reject) => {})
    Promise是一个对象，因此，我们使用new的方式新建一个。然后给它传一个函数作为参数，这个函数呢也有两个参数，一个叫resolve(决定)，一个叫reject(拒绝)，
    这两个参数也是函数。紧接着，我们使用then来调用这个Promise。
    调用then()方法将成功的和失败的回调push到执行队列中（当前状态为Pending），当resolve接受异步响应的值value会暂存value，并更变状态为
    Fulfilled， 当reject接受异步响应异常的值value会暂存value，并更变状态为Rejected.


核心：
    resolve：
        将Promise对象的状态从 Pending(进行中) 变为 Fulfilled(已成功)，这里需要根据resolve的参数判断状态的改变，如果是Promise对象，
        需要调用then()方法，将返回的参数用于状态和值的保存。
    reject:
        将Promise对象的状态从 Pending(进行中) 变为 Rejected(已失败)。

    then：
        精髓：Promise的先进之处在于可以在then方法中继续写Promise对象并返回，然后继续调用then来进行回调操作。
        返回的是Promise,如果当前回调函数返回MyPromise对象，必须等待其状态改变后在执行下一个回调

*/


// 源码

// 判断变量否为function
const isFunction = variable => typeof variable === 'function'
// 定义Promise的三种状态常量
const PENDING = 'PENDING'
const FULFILLED = 'FULFILLED'
const REJECTED = 'REJECTED'

class MyPromise {
    constructor (handle) {
        if (!isFunction(handle)) {
            throw new Error('MyPromise must accept a function as a parameter')
        }
        // 添加状态
        this._status = PENDING
        // 添加状态
        this._value = undefined
        // 添加成功回调函数队列
        this._fulfilledQueues = []
        // 添加失败回调函数队列
        this._rejectedQueues = []
        // 执行handle
        try {
            handle(this._resolve.bind(this), this._reject.bind(this))
        } catch (err) {
            this._reject(err)
        }
    }
    // 添加resovle时执行的函数
    _resolve (val) {
        const run = () => {
            if (this._status !== PENDING) return
            // 依次执行成功队列中的函数，并清空队列
            const runFulfilled = (value) => {
                let cb;
                while (cb = this._fulfilledQueues.shift()) {
                    cb(value)
                }
            }
            // 依次执行失败队列中的函数，并清空队列
            const runRejected = (error) => {
                let cb;
                while (cb = this._rejectedQueues.shift()) {
                    cb(error)
                }
            }
            /* 如果resolve的参数为Promise对象，则必须等待该Promise对象状态改变后,
              当前Promsie的状态才会改变，且状态取决于参数Promsie对象的状态
            */
            if (val instanceof MyPromise) {
                val.then(value => {
                    this._value = value
                    this._status = FULFILLED
                    runFulfilled(value)
                }, err => {
                    this._value = err
                    this._status = REJECTED
                    runRejected(err)
                })
            } else {
                this._value = val
                this._status = FULFILLED
                runFulfilled(val)
            }
        }
        // 为了支持同步的Promise，这里采用异步调用
        setTimeout(run, 0)
    }
    // 添加reject时执行的函数
    _reject (err) {
        if (this._status !== PENDING) return
        // 依次执行失败队列中的函数，并清空队列
        const run = () => {
            this._status = REJECTED
            this._value = err
            let cb;
            while (cb = this._rejectedQueues.shift()) {
                cb(err)
            }
        }
        // 为了支持同步的Promise，这里采用异步调用
        setTimeout(run, 0)
    }
    // 添加then方法
    then (onFulfilled, onRejected) {
        const { _value, _status } = this
        // 返回一个新的Promise对象
        return new MyPromise((onFulfilledNext, onRejectedNext) => {
            // 封装一个成功时执行的函数
            let fulfilled = value => {
                try {
                    if (!isFunction(onFulfilled)) {
                        onFulfilledNext(value)
                    } else {
                        let res =  onFulfilled(value);
                        if (res instanceof MyPromise) {
                            // 如果当前回调函数返回MyPromise对象，必须等待其状态改变后在执行下一个回调
                            res.then(onFulfilledNext, onRejectedNext)
                        } else {
                            //否则会将返回结果直接作为参数，传入下一个then的回调函数，并立即执行下一个then的回调函数
                            onFulfilledNext(res)
                        }
                    }
                } catch (err) {
                    // 如果函数执行出错，新的Promise对象的状态为失败
                    onRejectedNext(err)
                }
            }
            // 封装一个失败时执行的函数
            let rejected = error => {
                try {
                    if (!isFunction(onRejected)) {
                        onRejectedNext(error)
                    } else {
                        let res = onRejected(error);
                        if (res instanceof MyPromise) {
                            // 如果当前回调函数返回MyPromise对象，必须等待其状态改变后在执行下一个回调
                            res.then(onFulfilledNext, onRejectedNext)
                        } else {
                            //否则会将返回结果直接作为参数，传入下一个then的回调函数，并立即执行下一个then的回调函数
                            onFulfilledNext(res)
                        }
                    }
                } catch (err) {
                    // 如果函数执行出错，新的Promise对象的状态为失败
                    onRejectedNext(err)
                }
            }
            switch (_status) {
                // 当状态为pending时，将then方法回调函数加入执行队列等待执行
                case PENDING:
                    this._fulfilledQueues.push(fulfilled)
                    this._rejectedQueues.push(rejected)
                    break
                // 当状态已经改变时，立即执行对应的回调函数
                case FULFILLED:
                    fulfilled(_value)
                    break
                case REJECTED:
                    rejected(_value)
                    break
            }
        })
    }
    // 添加catch方法
    catch (onRejected) {
        return this.then(undefined, onRejected)
    }
    // 添加静态resolve方法
    static resolve (value) {
        // 如果参数是MyPromise实例，直接返回这个实例
        if (value instanceof MyPromise) return value
        return new MyPromise(resolve => resolve(value))
    }
    // 添加静态reject方法
    static reject (value) {
        return new MyPromise((resolve ,reject) => reject(value))
    }
    // 添加静态all方法
    static all (list) {
        return new MyPromise((resolve, reject) => {
            /**
             * 返回值的集合
             */
            let values = []
            let count = 0
            for (let [i, p] of list.entries()) {
                // 数组参数如果不是MyPromise实例，先调用MyPromise.resolve
                this.resolve(p).then(res => {
                    values[i] = res
                    count++
                    // 所有状态都变成fulfilled时返回的MyPromise状态就变成fulfilled
                    if (count === list.length) resolve(values)
                }, err => {
                    // 有一个被rejected时返回的MyPromise状态就变成rejected
                    reject(err)
                })
            }
        })
    }
    // 添加静态race方法
    static race (list) {
        return new MyPromise((resolve, reject) => {
            for (let p of list) {
                // 只要有一个实例率先改变状态，新的MyPromise的状态就跟着改变
                this.resolve(p).then(res => {
                    resolve(res)
                }, err => {
                    reject(err)
                })
            }
        })
    }
    finally (cb) {
        return this.then(
            value  => MyPromise.resolve(cb()).then(() => value),
            reason => MyPromise.resolve(cb()).then(() => { throw reason })
        );
    }
}


