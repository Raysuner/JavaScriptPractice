function flat(array) {
  return array.reduce((accmulator, item) => {
    return Array.isArray(item)
      ? accmulator.concat(flat(item))
      : accmulator.concat(item);
  }, []);
}

const res = flat([1, [2, [3], [[4]]]]);
console.log("res", res);
