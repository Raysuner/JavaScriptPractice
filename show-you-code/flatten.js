const isObject = value => typeof value === 'object' && value !== null

function flatten (obj) {
  const res = {}
  const dfs = (prefix, value) => {
    if (Array.isArray(value)) {
      value.forEach((it, index) => {
        dfs(`${prefix}[${index}]`, it)
      })
    } else if (isObject(value)) {
      Object.keys(value).forEach(key => {
        dfs(`${prefix}${prefix ? '.' : ''}${key}`, value[key])
      })
    } else {
      res[prefix] = value
    }
  }

  dfs('', obj)

  return res
}

const obj = {
  a: {
    b: 1,
    c: 2,
    d: { e: 5 }
  },
  b: [1, 3, { a: 2, b: 3 }],
  c: 3
}
console.log(flatten(obj))
