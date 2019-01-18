const app = require('./appHttp')
const errorLib = require('./lib/Errors')


/**
 * Entry point
 */

app
.bootstrap({
  'Content-Type': 'application/vnd.api+json'
})
.start()



errorLib.errorHandler()


