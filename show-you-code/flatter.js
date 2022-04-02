function flatter(array) {
  return array.reduce((accmulator, item) => {
    return Array.isArray(item)
      ? accmulator.concat(flatter(item))
      : accmulator.concat(item);
  }, []);
}

const res = flatter([1, [2, [3], [[4]]]]);
console.log("res", res);
