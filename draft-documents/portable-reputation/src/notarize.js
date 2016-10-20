var spawn = require('child_process').spawn
var os = require('os')


exports.notarize = function(doc, next) {
    var child = spawn('./src/ots/ots', ['stamp'])

    child.stdin.write(doc);
    child.stdin.end()

    child.stdout.on('data', function(data) {
        console.log('---data---')
        console.log(data.toString()); 
        console.log('---dataend---')
    });

    child.stderr.on('data', function(data) {
        console.log('stderr: ' + data);
    });

    child.on('error', function(err) {
        console.log(err)
    })
}
