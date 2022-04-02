const range = {
  from: 0,
  to: 10
}

range[Symbol.iterator] = function () {
  return {
    current: this.from,
    end: this.to,
    next () {
      if (this.current < this.end) {
        return { done: false, value: this.current++ }
      } else {
        return { done: true }
      }
    }
  }
}

for (const it of range) {
  console.log(it)
}
const arrayLike = {
  0: 'Hello',
  1: 'World',
  length: 2
}

arrayLike[Symbol.iterator] = function () {
  const keys = Object.keys(arrayLike)
  const len = keys.length
  return {
    current: 0,
    end: len,
    next () {
      if (this.current < this.end) {
        return { done: false, value: arrayLike[keys[this.current++]]}
      } else {
        return { done: true }
      }
    }
  }
}

for(const item of arrayLike) {
  console.log(item)
}
