function instanceof1(obj, constructor) {
  while (obj) {
    const proto = Object.getPrototypeOf(obj);
    if (proto === constructor.prototype) {
      return true;
    }
    obj = proto;
  }
  return false;
}
