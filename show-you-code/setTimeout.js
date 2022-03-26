function setTimeout2(fn, ms, ...args) {
  const id = setInterval(() => {
    fn(...args)
    clearInterval(id)
  }, ms)
}

setTimeout2(console.log, 1000, "hello, world")