const person = {name: "ztq", age: 18}

function objectCreate(object, propertyObject) {
  function F() { }
  F.prototype = object
  const obj = new F()
  if (propertyObject) {
    Object.defineProperties(obj, propertyObject)
  }
  if (object === null) {
    Object.setPrototypeOf(null)
  }
  return obj
}

const p = objectCreate(person)
console.log(p, p.name, p.age); // 可以在原型对象上获取到