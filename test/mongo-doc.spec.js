const chai = require('chai')
const { ObjectId } = require('bson')

const chaiMongoDoc = require('..')

chai.should()
chai.use(chaiMongoDoc)

describe('chaiMongoDoc', () => {
  describe('.mongoDoc', () => {
    describe('other types', () => {
      it('accepts booleans', () => {
        const actual = { a: true, b: false }
        const expected = { a: true, b: false }

        actual.should.be.mongoDoc(expected)
      })
    })

    describe('handles _id', () => {
      it('should be true if actual key is _id', () => {
        const id = 'abc123'
        const actual = { _id: id }
        const expected = { id }

        actual.should.be.mongoDoc(expected)
      })

      it('should be true if expected key is _id', () => {
        const id = 'abc123'
        const actual = { id }
        const expected = { _id: id }

        actual.should.be.mongoDoc(expected)
      })

      it('should be true if both keys are _id', () => {
        const id = 'abc123'
        const actual = { _id: id }
        const expected = { _id: id }

        actual.should.be.mongoDoc(expected)
      })

      it('should be true if both keys are id', () => {
        const id = 'abc123'
        const actual = { id }
        const expected = { id }

        actual.should.be.mongoDoc(expected)
      })
    })

    describe('comparing ObjectIds', () => {
      it('should be true when actual is an ObjectId', () => {
        const id = 'abc123abc123abc123abc123'
        const actual = { someId: new ObjectId(id) }
        const expected = { someId: id }

        actual.should.be.mongoDoc(expected)
      })

      it('should be true when expected is an ObjectId', () => {
        const id = 'abc123abc123abc123abc123'
        const actual = { someId: id }
        const expected = { someId: new ObjectId(id) }

        actual.should.be.mongoDoc(expected)
      })

      it('should be true when both are ObjectIds', () => {
        const id = 'abc123abc123abc123abc123'
        const actual = { someId: new ObjectId(id) }
        const expected = { someId: new ObjectId(id) }

        actual.should.be.mongoDoc(expected)
      })
    })

    describe('nested documents', () => {
      it('accepts nested documents', () => {
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
})