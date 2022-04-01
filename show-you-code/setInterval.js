function setInterval2(fn, ms, ...args) {
  let timeId = null
  function tick() {
    timeId = setTimeout(() => {
      fn(...args)
      tick()
    }, ms)
  }
  fn(...args)
  tick()
  return () => clearTimeout(timeId)
}

function setInterval3(fn, ms, ...args) {
  fn(...args)
  let timeId = setTimeout(function tick() {
    fn(...args)
    timeId = setTimeout(tick, ms)
  }, ms)
  return () => clearTimeout(timeId)
}

const cancel2 = setInterval2(console.log, 1000, 'hello', 'world', 'china')
const cancel3 = setInterval3(console.log, 1000, 'i', 'love', 'you')

setTimeout(cancel2, 5000)
setTimeout(cancel3, 5000)