function setInterval2(fn, ms, ...args) {
  function tick() {
    fn(...args)
    id = setTimeout(tick, ms)
  }

  let id = null
  tick()
  return () => clearTimeout(id)
}

const cancle = setInterval2(console.log, 1000, "hello", "world")

setTimeout(cancle, 5000)