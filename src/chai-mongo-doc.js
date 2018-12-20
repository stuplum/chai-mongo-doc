const compare = require('./compare')
const normalise = require('./normalise')

module.exports = function (chai) {
  chai.Assertion.addMethod('mongoDoc', function (expected) {
    const actual = this._obj

    this.assert(
      compare(actual, expected),
      'expected #{act} to be mongo doc #{exp}',
      'expected #{act} not to be mongo doc #{exp}',
      expected,
      actual
    )
  })

  chai.Assertion.addMethod('likeMongoDoc', function (expected) {
    const actual = this._obj

    const act = normalise(actual)
    const exp = normalise(expected)

    this.assert(
      compare(act, exp),
      'expected #{act} to be like mongo doc #{exp}',
      'expected #{act} not to be like mongo doc #{exp}',
      exp,
      act
    )
  })
}