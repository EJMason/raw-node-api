const url = require('url')

const obj = {}

const allowedMethods = ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']
const defaultHeaders = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'access-control-allow-headers': 'content-type, accept',
  'access-control-max-age': 10, // Seconds.
  'Content-Type': 'application/json'
};


obj.getPathName = req => '/' + url.parse(req.url).pathname.replace(/^\/+|\/+$/g, '')
obj.getMethod = req => req.method.toUpperCase()


obj.Router = () => {
  const obj = {}

  allowedMethods.forEach(val => (obj[val] = {}))
  obj.defaultHeaders = defaultHeaders

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


  obj.requestHandler = (req, res) => {
    const pathname = '/' + url.parse(req.url).pathname.replace(/^\/+|\/+$/g, '')
    const method = req.method.toUpperCase()
    return obj.getRequestHandler(method, pathname)
  }

  return obj;
}



obj.requestLogger = (method, pathname) => {
  const dt = new Date().toISOString().replace('T', ' ').substr(0, 19)
  console.log(`[${dt}] [${method}] ${pathname}`)
  // console.log(info.headers)
  // console.log(info.query)
}


module.exports = obj