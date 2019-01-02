const util = require('util')

const devConfig = require('./dev_config')
const prodConfig = require('./prod_config')

const debug = util.debuglog('config')

let config = {}
let preConfig = {}

if(process.env.NODE_ENV === 'dev') {
  debug(`USING DEVELOPMENT CONFIGURATION`)

  preConfig = devConfig
} else if(process.env.NODE_ENV === 'prod') {
  debug(`USING PRODUCTION CONFIGURATION`)
  preConfig = prodConfig
} else {
  console.log(`

    Please specify a running environment [NODE_ENV]...
         Options are: dev, prod, test

    To do this use startup script as:
       'NODE_ENV=dev node index.js'

    DEFAULTING TO DEVELOPMENT ENVIRONMENT...


  `)
  preConfig = devConfig
}

config.nodeEnv = preConfig.nodeEnv || ''

config.app = {}

// TODO: make sure to normalize port if using process.env since it is a string
config.app.httpPort = process.env.HTTP_PORT || preConfig.app.httpPort || 3000
config.app.httpsPort = process.env.HTTPS_PORT || preConfig.app.httpsPort || 3030
config.app.keyPath = process.env.KEY_PATH || preConfig.app.keyPath || ''
config.app.certPath = process.env.CERT_PATH || preConfig.app.certPath ||''

config.app.allowedMethods = preConfig.app.allowedMethods || ['GET', 'POST', 'PUT', 'DELETE']


config.crypto = {}
config.crypto.secretSauce = preConfig.crypto.secretSauce || 'superDuperSecret'
config.crypto.algo = config.crypto.algo || 'sha256'


debug(config)

module.exports = exports = config




