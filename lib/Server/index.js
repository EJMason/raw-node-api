const url = require('url')

const obj = {}

const allowedMethods = ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']


obj.getPathName = req => '/' + url.parse(req.url).pathname.replace(/^\/+|\/+$/g, '')
obj.getMethod = req => req.method.toUpperCase()


obj.Router = () => {
  const obj = {}

  allowedMethods.forEach(val => (obj[val] = {}))

  // Add a new endpoint
  obj.addRoute = (method, path, cb) => {
    // TODO: Fix this to have better handling,
    if (obj[method]) obj[method][path] = cb
    else console.error('Error, incorrect method')
  }

  // Check for a valid path
  obj.isValidPath = (method, path) => (obj[method] && obj[method][path])

  // 
  obj.getRequestHandler = (method, path) => {
    if (obj.isValidPath(method, path)) {
      return obj[method][path]
    } else {
      return (req, res) => {
        res.setHeader('Content-Type', 'application/json');
        res.writeHead(404)

        const data = {
          statusCode: 404,
          error: '404, url does not exist',
          data: '404, url does not exist'
        }

        res.end(JSON.stringify(data))
      }
    }
  }

  return obj;
}


obj.requestHandler = (req, res) => {
  //TODO: Add default headers here using res
  //TODO: Add middleware?

  const pathname = '/' + url.parse(req.url).pathname.replace(/^\/+|\/+$/g, '')
  const method = req.method.toUpperCase()

  return router.getRequestHandler(method, pathname)
}


obj.requestLogger = (method, pathname) => {
  const dt = new Date().toISOString().replace('T', ' ').substr(0, 19)
  console.log(`[${dt}] [${method}] ${pathname}`)
  // console.log(info.headers)
  // console.log(info.query)
}


module.exports = obj