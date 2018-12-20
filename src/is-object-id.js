const { ObjectId } = require('bson')
const isObject = require('./is-object')

module.exports = function isObjectId (prop) {
  return isObject(prop) && ObjectId.isValid(prop)
}