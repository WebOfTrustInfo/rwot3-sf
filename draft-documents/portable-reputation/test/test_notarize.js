var notarize = require('../src/notarize')

function testInvokeNotarize() {
    var doc = {hello: 'world'}
    var docStr = JSON.stringify(doc)
    notarize.notarize(docStr, function(err, ots) {
        console.log(err, ots)    
    })
}

testInvokeNotarize()
