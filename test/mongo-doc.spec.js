const chai = require('chai')
const { ObjectId } = require('bson')

const chaiMongoDoc = require('..')

chai.should()
chai.use(chaiMongoDoc)

describe('chaiMongoDoc', () => {
  describe('.mongoDoc', () => {
    it('compares string representations of ids', () => {
      ({ id: 'foo' }).should.be.mongoDoc({ id: 'foo' })
    })
    it('compares not string representations of ids', () => {
      ({ id: 'foo' }).should.not.be.mongoDoc({ id: 'bar' })
    })

    it('discovers ids at _id', () => {
      ({ _id: 'foo' }).should.be.mongoDoc({ _id: 'foo' })
    })

    it('accepts ObjectIds passed in directly', () => {
      ({ id: 'abc123abc123abc123abc123' }).should.be.mongoDoc({ _id: new ObjectId('abc123abc123abc123abc123') })
    })

    it('accepts ObjectIds passed in directlyz', () => {
      ({ _id: new ObjectId('abc123abc123abc123abc123') }).should.be.mongoDoc({ id: 'abc123abc123abc123abc123' })
    })

    it('accepts ObjectIds passed in directlyzz', () => {
      ({ _id: new ObjectId('abc123abc123abc123abc123') }).should.be.mongoDoc({ _id: new ObjectId('abc123abc123abc123abc123') })
    })

    it('accepts nested ObjectIds passed in directly', () => {
      ({
        id: 'abc123abc123abc123abc123',
        subDoc: {
          id: '123abc123abc123abc123abc'
        }
      }).should.be.mongoDoc({
        _id: new ObjectId('abc123abc123abc123abc123'),
        subDoc: {
          _id: new ObjectId('123abc123abc123abc123abc')
        }
      })
    })
  })
})