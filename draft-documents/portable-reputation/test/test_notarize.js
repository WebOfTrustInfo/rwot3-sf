var chai = require('chai')
var notarize = require('../src/notarize.js').notarize

var expect = chai.expect

describe('notarize', function () {
  this.timeout(5e3)

  it('should notarize the things', function (done) {
    var doc = {hello: 'world'}
    var docStr = JSON.stringify(doc)
    notarize(docStr)
    .then(function (ots) {
      var otsStr = new Buffer(ots, 'base64').toString("ascii")
      // TODO: This assertion is currently not very smart, make it smart.
      expect(otsStr).to.match(/OpenTimestamps/)
      done()
    }).catch(done)
  })
})
