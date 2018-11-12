const util = require('util')

const devConfig = require('./dev_config')
const prodConfig = require('./prod_config')

const debug = util.debuglog('config')

let config = {}

config.nodeEnv = ''

config.app = {}

// TODO: make sure to normalize port if using process.env since it is a string
config.app.httpPort = process.env.HTTP_PORT || 3000
config.app.httpsPort = process.env.HTTPS_PORT || 3030
config.app.keyPath = ''
config.app.certPath = ''

config.app.allowedMethods = ['GET', 'POST', 'PUT', 'DELETE']




if(process.env.NODE_ENV === 'dev') {
  debug(`USING DEVELOPMENT CONFIGURATION`)
  config = Object.assign(config, devConfig)
}

if(process.env.NODE_ENV === 'prod') {
  debug(`USING PRODUCTION CONFIGURATION`)
  config = Object.assign(config, prodConfig)
}

debug(config)

module.exports = exports = config



