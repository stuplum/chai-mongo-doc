const isObject = require('./is-object')
const isObjectId = require('./is-object-id')

function isFunction (val) {
  return typeof val === 'function'
}

function isNumber (val) {
  return typeof val === 'number'
}

function isString (val) {
  return typeof val === 'string'
}

function isSameType (a, b) {
  return typeof(a) === typeof(b)
}

const KEY_MAPPINGS = {
  id: '_id',
  _id: 'id'
}

function getActual (key, actual) {
  if (actual[key] !== undefined) {
    return actual[key]
  }

  key = KEY_MAPPINGS[key]

  if (key) {
    return actual[key]
  }
}

module.exports = function compare (actual, expected) {
  if (expected === actual) {
    return true
  }

  if (isObjectId(expected)) {
    if (isObjectId(actual) || isString(actual)) {
      return expected.equals(actual)
    }
    return false
  }

  if (isObjectId(actual)) {
    if (isObjectId(expected) || isString(expected)) {
      return actual.equals(expected)
    }
    return false
  }

  if (!isSameType(actual, expected)) {
    return false
  }

  if (!isObject(expected) || expected === null) {
    return expected === actual
  }

  if (!!expected && !actual) {
    return false
  }

  if (Array.isArray(expected)) {
    if (!isNumber(actual.length)) {
      return false
    }

    const cloned = Array.prototype.slice.call(actual)
    return expected.every((exp) =>
      cloned.some((act) => compare(act, exp))
    )
  }

  if (expected instanceof Date) {
    if (actual instanceof Date) {
      return expected.getTime() === actual.getTime()
    } else {
      return false
    }
  }

  return Object.keys(expected).every((key) => {
    const act = getActual(key, actual)
    const exp = expected[key]

    if (isObjectId(exp) && !act) {
      if (key.startsWith('_')) {
        const newAct = actual[key.substr(1)]
        if (newAct) {
          return compare(newAct, exp)
        }
        return false
      }
      return false
    }

    if (isObjectId(act)) {
      return compare(act, exp)
    }

    if (isObject(exp) && act !== null) {
      return compare(act, exp)
    }

    if (isFunction(exp)) {
      return exp(act)
    }

    return act === exp
  })
}
