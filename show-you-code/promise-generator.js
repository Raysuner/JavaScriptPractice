function getValue(n, ms = 1000) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(n)
    }, ms)
  })
}

function* generator() {
  console.log(1)
  let x = yield getValue(2, 1000)
  console.log(x)
  x = yield getValue(3, 2000)
  console.log(x)
  x = yield 4
  console.log(x)
}

function co(generator) {
  return new Promise((resolve, reject) => {
    let iterable = generator()
    let generated = iterable.next()
    tick()

    function tick() {
      if (generated.done === false) {
        Promise.resolve(generated.value).then(
          value => {
            try {
              generated = iterable.next(value)
              tick()
            } catch (err) {
              reject(err)
            }
          },
          reason => {
            try {
              generated = iterable.throw(reason)
              tick()
            }
            catch (err) {
              reject(err)
            }
          }
        )
      }
      else {
        resolve(generated.value)
      }
    }
  })
}

co(generator)