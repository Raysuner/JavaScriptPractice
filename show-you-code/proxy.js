const target = {
  foo: 'bar',
  baz: 'qux'
}
const handler = {
  get (trapTarget, property, receiver) {
    let decoration = ''
    if (property === 'foo') {
      decoration = '!!!'
    }
    return trapTarget[property] + decoration
    // return Reflect.get(...arguments) + decoration
  }
}
const proxy = new Proxy(target, handler)
console.log(proxy.foo) // bar!!!
console.log(target.foo) // bar
console.log(proxy.baz) // qux
console.log(target.baz) // qux
