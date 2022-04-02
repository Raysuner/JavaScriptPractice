Function.prototype.call2 = function (object, ...args) {
  const context = object || globalThis
  const fn = Symbol()
  context[fn] = this
  const res = context[fn](...args)
  delete context[fn]
  return res
}

Function.prototype.apply2 = function (obejct, ...args) {
  return this.call2(obejct, ...[].concat(...args))
}

Function.prototype.bind3 = function (object, ...outerArgs) {
  const context = { ...(object || window) }
  const fn = Symbol()
  context[fn] = this
  const _this = this

  const fBound = function (...innerArgs) {
    if (this instanceof _this) {
      this[fn] = _this
      this[fn](...outerArgs.concat(innerArgs))
    } else {
      return context[fn](...outerArgs.concat(innerArgs))
    }
  }

  fBound.prototype = Object.create(this.prototype)
  return fBound
}

let user = {
  name: 'ztq'
}

function say (age, job) {
  if (arguments.length !== 0) {
    return this.name + ' : ' + String(age) + ', ' + job
  } else {
    return 'say function called, but the arguments is empty'
  }
}

console.log(say.call2(null))
console.log(say.call2(user, 18, 'Software Engineer'))

console.log(say.apply2(null))
console.log(say.apply2(user, [18, 'Software Engineer']))

// console.log(say.bind3(user, "hello")("world"))
const con = say.bind3(user)
console.dir(con)
const p = con('hello', 'world')
console.dir(p)
