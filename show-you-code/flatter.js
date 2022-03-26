function flatten2(array) {
  if (!array.length) {
    return
  }
  return array.reduce((accumlator, item) =>
    Array.isArray(item) ? [...accumlator, ...flatten2(item)] : [...accumlator, item]
  , [])
}
console.log(flatten2([1, 2, [1, [2, 3, [4, 5, [6]]]]]));
