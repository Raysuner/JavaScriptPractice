Function.prototype.call2 = function (obejct, ...args) {
  obejct = obejct || globalThis
  const fn = Symbol()
  obejct[fn] = this
  const res = obejct[fn](...args)
  delete obejct[fn]
  return res
}

Function.prototype.apply2 = function (obejct, ...args) {
  return this.call2(obejct, ...([].concat(...args)))
}

Function.prototype.bind2 = function (object, ...outerArgs) {
  const fn = this
  const fBound = function (...innerArgs) {
    const bindArgs = outerArgs.concat(innerArgs)
    const _this = this instanceof fBound ? this : object
    return fn.apply(_this , bindArgs)
  }
  fBound.prototype = fn.prototype
  return fBound
}

Function.prototype.bind3 = function (object, ...outerArgs) {
  object = object || globalThis
  const fn = Symbol()
  object.fn = this
  const fBound = function (...innerArgs) {
    const bindArgs = outerArgs.concat(innerArgs)
    if (this instanceof object.fn) {
      this.fn = object.fn
      const result = this.fn(...bindArgs)
      delete this.fn
      return result
    } 
  }
  fBound.prototype = Object.create(this.prototype)
  return fBound
}

let user = {
    name: "ztq"
}

function say(age, job) {
    if (arguments.length !== 0) {
        return this.name + " : " + String(age) + ", " + job
    }
    else {
        return "say function called, but the arguments is empty"
    }
}

console.log(say.call2(null))
console.log(say.call2(user, 18, "Software Engineer"))

console.log(say.apply2(null))
console.log(say.apply2(user, [18, "Software Engineer"]))

// console.log(say.bind3(user, "hello")("world"))
// const con = say.bind3(user)
// const p = new con("hello", "world")
// console.log(p)