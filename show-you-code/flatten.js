function flatten(array) {
  return array.reduce((accmulator, item) => {
    return Array.isArray(item)
      ? accmulator.concat(flatten(item))
      : accmulator.concat(item);
  }, []);
}

const res = flatten([1, [2, [3], [[4]]]]);
console.log("res", res);
