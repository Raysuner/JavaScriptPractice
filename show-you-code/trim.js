function trim(str) {
  if (typeof str !== "string") {
    return str
  }

  return str.replace(/^\s*/, "").replace(/\s*$/, "")
}

console.log(trim(" \n st sdsd \t"))