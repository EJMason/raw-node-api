const url = require('url')

const Server = require('./lib/Server')

const obj = {}

const defaultHeaders = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'access-control-allow-headers': 'content-type, accept',
  'access-control-max-age': 10, // Seconds.
  'Content-Type': 'application/json'
};

const router = Server.Router()

router.addRoute('GET', '/hello', (req, res) => {
  res.writeHead(200, defaultHeaders)

  const data = {
    statusCode: 200,
    data: 'Hello, butts'
  }
  res.end(JSON.stringify(data))
})


obj.requestHandler = (req, res) => {
  //TODO: Add default headers here using res
  //TODO: Add middleware?

  const pathname = '/' + url.parse(req.url).pathname.replace(/^\/+|\/+$/g, '')
  const method = req.method.toUpperCase()
  console.log(pathname)

  return router.getRequestHandler(method, pathname)
}


module.exports = obj
