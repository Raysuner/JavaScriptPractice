function deepClone(obj, map = new WeakMap()) {
  if (typeof obj !== "object") {
    return obj
  }

  if (map.has(obj)) {
    return map.get(obj)
  }

  const object = obj instanceof Array ? [] : {}
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      map.set(key, obj[key])
      if (obj[key] && typeof obj[key] === "object") {
        object[key] = deepClone(obj[key])
      } else {
        object[key] = obj[key]
      }
    }
  }
  return object
}