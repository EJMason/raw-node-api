const config = require('./lib/config')
const NodeServer = require('./lib/Server')

const app = new NodeServer('http', config.app.httpPort)



module.exports = exports = app