var assert = require('chai').assert

function testInvokeNotarize () {
  var notarize = require('../src/notarize')

  var doc = {hello: 'world'}
  var docStr = JSON.stringify(doc)
  notarize.notarize(docStr)
    .then(function (ots) {
      var otsStr = new Buffer(ots, 'base64').toString("ascii")
      // TODO: This assertion is currently not very smart, make it smart.
      assert(otsStr.indexOf('TimestampsProof') > -1)
      return
    }).catch(function (err) {
      // FIXME: TO to throw an error further in nodejs?
      console.log(err)
    })
}

testInvokeNotarize()
