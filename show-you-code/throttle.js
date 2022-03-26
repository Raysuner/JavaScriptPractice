function throttle(func, ms) {

  let isThrottled = false,
    savedArgs,
    savedThis;

  function wrapper() {

    if (isThrottled) { // (2)
      savedArgs = arguments;
      savedThis = this;
      return;
    }
    isThrottled = true;

    func.apply(this, arguments); // (1)

    setTimeout(function() {
      isThrottled = false; // (3)
      if (savedArgs) {
        wrapper.apply(savedThis, savedArgs);
        savedArgs = savedThis = null;
      }
    }, ms);
  }

  return wrapper;
}

const fn = throttle(console.log, 1000)

const time  = setInterval(() => {
  fn(1)
}, 100)

setTimeout(() => {
  clearInterval(time)
}, 1000)

// function throttle(fn, ms) {
//   let _this = null, _args = null
//   let isThrottled = false

//   function wrapper(...args) {
//     if (isThrottled) {
//       _this = this
//       _args = args
//       return
//     }

//     fn.apply(this, args)
//     isThrottled = true

//     setTimeout(() => {
//       isThrottled = false
//     }, ms)
//   }
//   return wrapper
// }