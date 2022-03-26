class Promise2 {
  static resolve(arg) {
    return new Promise((resolve, reject) => {
      resolve(arg)
    })
  }

  static reject(arg) {
    return new Promise((resolve, reject) => {
      reject(arg)
    })
  }

  static all(promises) {
    return new Promise(resolve, reject) {
      const len = promises.length
      const result = new Array(len)
      let counter = 0
      for (let i = 0; i < promises.length; i++) {
        Promise.resolve(promises[i]).then(value => {
          result[i] = value
          counter++
          if (counter === len) {
            resolve(result)
          }
        }, error => {
          reject(error)
        })
      }
    }
  }

  static race(promises) {
    return new Promise((resolve, reject) => {
      for (const promise of promises) {
        Promise.resolve(promise).then(resolve, reject)
      }
    })
  }
}