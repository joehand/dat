var http = require('http')
var hyperdriveHttp = require('hyperdrive-http')

module.exports = function (archive) {
  var getArchive = function (datInfo, cb) {
    cb(null, archive)
  }
  var server = http.createServer()
  server.listen(3000, '0.0.0.0')
  server.on('request', hyperdriveHttp(getArchive))
}
