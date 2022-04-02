function throttle(fn, ms) {
  let saveArgs, saveThis;
  let isThrottled = false;

  if (isThrottled) {
    saveArgs = arguments;
    saveThis = this;
    return;
  }

  fn.apply(this, arguments);
  isThrottled = true;

  function wrapper() {
    isThrottled = false;
    setTimeout(() => {
      if (saveArgs) {
        wrapper.apply(saveThis, saveArgs);
        saveArgs = saveThis = null;
      }
    }, ms);
  }

  return wrapper;
}
