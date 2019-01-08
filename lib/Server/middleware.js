const helpers = require('../utils')

const { green } = helpers.color


const middleware = exports = module.exports = {}

const timestamp = () => {
  const today = new Date()
  const h = today.getHours()
  let m = today.getMinutes()
  let s = today.getSeconds()

  m = (m < 10) ? (`0${m}`) : m
  s = (s < 10) ? (`0${s}`) : s

  return `${h}:${m}:${s}`
}


const consoleLogRequests = function(req) {
  console.log(`${timestamp()}  [${green(req.my.method)}] ${req.my.pathname}  ${JSON.stringify(req.body)}`)
}

const devMiddlewares = [
  consoleLogRequests,
]

middleware.developementMiddleware = (req, res) => {
  if(process.env.NODE_ENV === 'dev') {
    devMiddlewares.forEach(mw => mw(req, res))
  }
}


