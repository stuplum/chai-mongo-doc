module.exports = function isObject(val) {
  return val !== null && (typeof val === 'object')
}
