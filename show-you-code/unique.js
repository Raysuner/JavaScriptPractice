function unique1(array) {
  return Array.from(new Set(array));
}

function unique2(array) {
  return array.reduce((accmulator, item) => {
    return accmulator.includes(item) ? accmulator : accmulator.concat(item);
  }, []);
}

const arr = [1, 4, 3, 2, 2, 6, 7, 6, 9, 8];

console.log(unique2(arr));
