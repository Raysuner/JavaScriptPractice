function setTimeout2(fn, ms, ...args) {
  setInterval(() => {
    fn(...args)
    clearInterval(timeId)
  }, ms)
}