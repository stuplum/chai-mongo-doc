const isObjectId = require('./is-object-id')

function normaliseKey (key) {
  return key === '_id' ? 'id' : key
}

function normaliseVal (val) {
  if (isObjectId(val)) {
    return `${val}`
  }

  if (Array.isArray(val)) {
    return val.map(normalise)
  }

  return val
}

function normalise (src) {
  return Object.keys(src)
    .reduce((prev, key) => Object.assign(prev, { [normaliseKey(key)]: normaliseVal(src[key]) }), {})
}

module.exports = normalise
