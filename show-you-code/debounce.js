function debounce(fn, ms) {
  let timeId = null
  return function (...args) {
    if (timeId) {
      clearTimeout(timeId)
    }
    setTimeout(() => {
      fn.apply(this, args)
    }, ms)
  }
}