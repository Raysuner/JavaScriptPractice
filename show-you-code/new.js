function Person(name, age) {
  this.name = name;
  this.age = age;
  return 1;
}

function myNew(constructor, ...args) {
  if (typeof constructor !== "function") {
    throw new Error("第一个参数需要传递函数");
  }
  const obj = Object.create(constructor.prototype);
  const res = constructor.apply(obj, args);
  if (res && typeof res === "object") return res;
  else return obj;
}

const p = myNew(Person, "ztq", 18);
const p1 = new Person("ztq", 18);
console.log(p, p1);
