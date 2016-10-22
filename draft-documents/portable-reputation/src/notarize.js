var spawn = require('child_process').spawn

var OTS_LOGS = [
  'Submitting to remote calendar'
]

exports.notarize = function (doc) {
  return new Promise(function (resolve, reject) {
    var child = spawn('./src/ots/ots', ['stamp'])

    child.stdout.on('data', function (data) {
      resolve(data.toString('base64'))
    })

    child.stderr.on('data', function (err) {
      // NOTE: The output 'Submitting to remote calendar...'
      //     is recognized as stderr here (for whatever reason).
      //     As we do not want to silently fail if an actual error
      //     occurs (e.g. a timeout), we filter by a list of logs.
      //
      //     FIXME: If anyone has a better idea. Plz fix.

      err = err.toString()
      var isError = OTS_LOGS.reduce(function (prev, curr) {
        return prev && err.indexOf(curr) > -1
      }, false)

      if (isError) {
        reject(err)
      } else {
        // nop
      }
    })
    child.on('error', function (err) {
      reject(err.toString())
    })

    // Write document to stdtin
    child.stdin.write(doc)
    child.stdin.end()
  })
}
