const config = require('./lib/config')
const NodeServer = require('./lib/Server')
const userRouter = require('./users/usersRouter')

const app = new NodeServer('http', config.app.httpPort)

/**
 * This will add the routes
 */
app.setupRouters([
  userRouter
])

module.exports = exports = app