function isPlainObject(obj) {
  return Object.prototype.toString.call(obj) === "[object Object]";
}

function deepMerge(...objList) {
  const mergeResult = Object.create(null);
  objList.forEach((obj) => {
    Object.keys(obj).forEach((key) => {
      const value = obj[key];
      if (isPlainObject(value)) {
        if (isPlainObject(mergeResult[key])) {
          mergeResult[key] = deepMerge(mergeResult[key], value);
        } else {
          mergeResult[key] = deepMerge({}, value);
        }
      } else {
        mergeResult[key] = value;
      }
    });
  });
  return mergeResult;
}

const obj1 = { a: { b: 1 } },
  obj2 = { a: { b: 2 } };
const res = deepMerge(obj1, obj2);

console.log(res);
