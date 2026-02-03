const isObject = (value) => value && typeof value === 'object' && !Array.isArray(value)

const mergeDeep = (base, next) => {
  if (Array.isArray(base)) {
    return Array.isArray(next) ? next : base
  }
  if (!isObject(base)) {
    return next ?? base
  }
  const result = { ...base }
  if (!isObject(next)) return result
  Object.keys(next).forEach((key) => {
    result[key] = mergeDeep(base[key], next[key])
  })
  return result
}

export default mergeDeep
