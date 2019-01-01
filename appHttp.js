const config = require('./lib/config')
const NodeServer = require('./lib/Server')
const users = require('./users')
const tokens = require('./tokens')

const app = new NodeServer('http', config.app.httpPort)

/**
 * This will add the routes
 */
app.setupRouters([
  users.routes,
  tokens.routes
])

module.exports = exports = app