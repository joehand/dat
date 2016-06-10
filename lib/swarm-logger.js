var chalk = require('chalk')

module.exports = swarmLogger

function swarmLogger (swarm, logger) {
  var count = '0'
  var activePeers = swarm.connections.length
  var browserPeers = 0
  var totalPeers = swarm.connecting + swarm.connections.length

  swarm.on('connection', function (con) {
    totalPeers += 1
    updatePeers()
    con.on('close', function () {
      totalPeers -= 1
      updatePeers()
    })
  })

  swarm.on('browser-connection', function (con) {
    totalPeers += 1
    browserPeers += 1
    updatePeers()
    con.on('close', function () {
      totalPeers -= 1
      browserPeers -= 1
      updatePeers()
    })
  })

  function updatePeers () {
    if (activePeers > 0) count = activePeers + '/' + totalPeers
    var msg = chalk.blue('  Connected to ' + chalk.bold(count) + ' peers')
    msg += chalk.blue(' & ' + chalk.bold(browserPeers) + ' webrtc peers')
    logger.status(msg, -1)
  }
}
