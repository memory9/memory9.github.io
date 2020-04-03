---
title: JavaScript 常见函数方法模拟实现
date: "2020-02-12"
description: call、apply、bind、new 等常见方法的模拟实现
---

## call 的模拟实现

call() 方法先指定了 this 和可选的参数值后，调用某个函数或方法，返回该函数执行的返回值。

1. 将函数设置为对象的属性
2. 执行该函数
3. 在对象属性中删除该函数


```js
Function.prototype.myCall = function (context, ...args) {
  // 对 context 为 null 的情况做处理
  context = context || window

  // 获取调用 call 的函数，可以用 this 获取
  context.fn = this

  // 调用该函数
  let temp = context.fn(...args)

  // 在属性中删除该函数
  delete context.fn

  return temp
}
```

如果不用 ES6 中的 `...` 语法，可以对函数的 `arguments` 类数组进行参数处理

## apply 的模拟实现

apply 方法与 call 方法的不同之处是，apply 接收数组形式的可选参数

```js
  /**
   * @param {function} context
   * @param {array} arr
   */
  Function.prototype.myApply = function (context, arr) {
    context = context || window
    context.fn = this
    let temp = context.fn(...arr)
    delete context.fn
    return temp
  }
```

## bind 的模拟实现

bind() 方法创建一个新的函数，在 bind() 被调用时，这个新函数的 this 被指定为 bind() 的第一个参数，而其余参数将作为新函数的参数，供调用时使用。

```js
  Function.prototype.myBind = function (context, ...args) {
    // 调用 bind 的不是函数，报错！
    if (typeof this !== 'function') {
      threw new Error('Function.prototype.myBind - what is trying to bind is not callable!')
    }

    context = context || window

    // 获取调用 bind 的函数
    const self = this

    return function F(...bindArgs) {
      const distArgs = args.concat(bindArgs)
      // 如果返回的函数以new F()的方式调用，因为new不会被任何方式改变this指向，所以我们需要忽略传入的 this
      if (this instanceof F) {
        return new self(...distArgs)
      }
      return self.apply(context, distArgs)
    }
  }
```

bind() 方法创建的函数还可以作为构造函数来创建新对象

一个绑定函数也能使用new操作符创建对象：这种行为就像把原函数当成构造器。提供的 this 值被忽略，同时调用时的参数被提供给模拟函数。

## new
new 运算符创建一个用户定义的对象类型的实例或具有构造函数的内置对象类型之一

```js
/**
 * 创建一个空的简单JavaScript对象（即{}）；
 * 链接该对象（即设置该对象的构造函数）到另一个对象 ；
 * 将步骤1新创建的对象作为this的上下文 ；
 * 如果该函数没有返回对象，则返回this。
 */

const _new = (_Contructor, ...args) => {
  // 1.创建一个空的简单JavaScript对象（即{}）；
  const obj = {}
  // 2.链接该对象（即设置该对象的构造函数）到另一个对象 ；
  Object.setPrototypeOf(obj, _Contructor.prototype)
  // 3.将步骤1新创建的对象作为this的上下文 ；
  const ret = _Contructor.apply(obj, args)
  //4.如果该函数没有返回对象，则返回this。
  return ret instanceof Object ? ret : this
}
```

## 节流 throttle
节流指的是，如果持续触发事件，每隔一段事件，执行一次事件

* 当触发事件时，取出当前的时间戳，减去之前的时间戳（初始为0）。如果大于之前设置的时间周期，则执行函数，并更新时间戳为当前时间戳；如果小于时间周期，就不执行函数。

```js
  // 使用时间戳实现
  function throttle(func, delay) {
    let previous = 0
    return function(...args) {
      const now = +new Date()
      const context = this
      if (now - previous > delay) {
        func.apply(context, args)
        previous = now
      }
    }
  }
```

特点：事件会立即执行，但是停止触发后不能再执行。

* 在触发事件时，设置一个定时器，再次触发事件时，如果定时器存在，就不执行；直到定时器执行，然后执行函数，清空定时器。

```js
  // 使用定时器实现
  function throttle(func, delay) {
    let timeout
    let previous = 0

    return function(...args) {
      const context = this

      if (!timeout) {
        timeout = setTimeout(function() {
          timeout = null
          func.apply(this, args)
        }, delay)
      }
    }
  }
```

特点：事件会在 n 秒后第一次执行，事件停止触发后依然会执行一次。

leading: false 表示禁用第一次执行

trailing: false 表示禁用停止触发的回调

```js
  function throttle(func, delay, options) {
    let timeout, context, args, result
    let previous = 0

    if (!options) {
      options = {}
    }

    const later = function() {
      previous = options.leading === false ? 0 : new Date().getTime()
      timeout = null
      func.apply(context, args)
    }

    const throttled = function() {
      const now = new Date().getTime()
      if (!previous && options.leading === false) {
        previous = now
      }

      // 下次触发 func 剩余的时间
      let remaining = delay - (now - previous)
      context = this
      args = arguments

      if (remaining <=0 || remaining > delay) {
        if (timeout) {
          clearTimeout(timeout)
          timeout = null
        }

        previous = now
        func.apply(context, args)

        if (!timeout) {
          context = args = null
        }
      } else if (!timeout && options.trailing !== false) {
        timeout = setTimeout(later, remaining)
      }
    }

    throttled.cancel = function() {
      clearTimeout(timeout)
      previous = 0
      timeout = null
    }

    return throttled
  }
```

## 防抖 debounce

```js
  function debounce(func, delay, immediate) {
    let timeout
    return function(...args) {
      const context = this

      if (timeout) {
        clearTimeout(timeout)
      }

      if (immediate) {
        // 如果已经执行了，就不再执行了
        const callNow = !timeout
        timeout = setTimeout(function() {
          timeout = null
        }, delay)

        if (callNow) {
          func.apply(context, args)
        }
      } else {
        timeout = setTimeout(function() {
          func.apply(context, args)
        }, delay)
      }
    }
  }
```

## Promise
Promise 构造函数传入的参数是一个执行函数。

* 内部使用 status 记录内部状态（pending、resolved、rejected）
* data 记录 resolve 之后得到的数据或是错误
* resolve 之后需要执行的函数队列
* reject 之后需要执行的函数队列
* 向要执行的函数 fn 传入 resolve 函数和 reject 函数，这两个函数都是异步执行的
* resolve(data) 函数内部会将 status 置为 resolved，并储存 data，最后调用 resolve 队列中的函数。
* reject(err) 函数将 status 置为 rejected，并存储 err，最后调用 reject 队列中的函数

```js
  function Promise(fn) {
    const promise = this
    promise.status = 'PENDING'
    promise.value = null
    promise.reason = null
    promise.resolves = []
    promise.rejects = []

    function resolve(value) {
      setTimeout(function () {
        promise.status = 'FULFILLED'
        promise.resolves.forEach(function (cb) {
          cb(value)
        })
      }, 0)
    }

    function reject(reason) {
      setTimeout(function () {
        promise.status = 'REJECTED'
        promise.rejects.forEach(function (cb) {
          cb(reason)
        })
      }, 0)
    }

    promise.then = function (onFulfilled, onRejected) {
      return new Promise(function (resolve, reject) {
        function handle(value) {
          let result = typeof onFulfilled === 'function' && onFulfilled(value) || value

          if (result instanceof Promise) {
            result.then(function (value) {
              resolve(value)
            })
          } else {
            resolve(result)
          }
        }

        function err(reason) {
          let result = typeof onRejected === 'function' && onRejected(reason) || reason

          reject(reason)
        }

        if (promise.status === 'PENDING') {
          promise.resolves.push(handle)
          promise.rejects.push(err)
        } else if (promise.status === 'FULFILLED') {
          handle(promise.value)
        } else if (promise.status === 'REJECTED') {
          err(promise.reason)
        }
      })
    }

    // 全部完成才完成，一个 reject 直接 reject
    promise.all = function(promiseArr) {
      return new Promise((resolve, reject) => {
        // 结果数组
        let res = []
        let count = 0
        function handleData(index, data) {
          count++
          res[index] = data
          if (count === promiseArr.length) {
            resolve(res)
          }
        }

        for (let i = 0; i < promiseArr.length; i++) {
          Promise.resolve(promiseArr[i]).then((data) => {
            handleData(i, data)
          }, reject)
        }
      })
    }

    fn(resolve, reject)
  }
```

## 浅拷贝
浅拷贝和赋值有什么区别呢？

对于引用数据类型（数组、对象、函数），赋值只改变了引用的指针，指向同一个对象，所以相互之间会有影响。

而浅拷贝会在堆中重新创建内存，拷贝前后对象的基本类型互不影响，但只会拷贝一层，不能对对象中的子对象进行拷贝。

```js
// Object
Object.assign({}, obj)
{...obj}

// Array
Array.concat()
Array.slice(0)
Array.from(a1)
[...a1]
```

## 深拷贝

```js
  // 缺点是对 函数、null、undefined 无效，不能处理循环引用
  JSON.parse(JSON.stringfy())

  // 手写
  function deepClone(target, map = new Map()) {
    if (typeof target === 'object') {
      let cloneTarget = Array.isArray(target) ? [] : {}

      // 解决循环引用的问题
      if (map.get(target)) {
        return map.get(target)
      }
      map.set(target, cloneTarget)

      for (const key in target) {
        cloneTarget[key] = deepClone(target[key], map)
      }
      return cloneTarget
    } else {
      return target
    }
  }
```
  [参考](https://juejin.im/post/5d6aa4f96fb9a06b112ad5b1#)
