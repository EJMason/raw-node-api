const url = require('url')
const { StringDecoder } = require('string_decoder');

const allowedMethods = ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']
const defaultHeaders = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'access-control-allow-headers': 'content-type, accept',
  'access-control-max-age': 10, // Seconds.
  'Content-Type': 'application/json'
};


exports.getPathName = req => '/' + url.parse(req.url).pathname.replace(/^\/+|\/+$/g, '')
exports.getMethod = req => req.method.toUpperCase()


exports.Router = () => {
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
      return unknownPathname
    }
  }


  obj.requestHandler = (req, res) => {
    const pathname = exports.getPathName(req)
    const method = exports.getMethod(req)
    const handler = obj.getRequestHandler(method, pathname)
    handler(req, res)
    // return obj.getRequestHandler(method, pathname)
  }

  obj.payloadHandler = (req, cb) => {
    const decoder = new StringDecoder('utf-8')
    let buffer = ''

    req.on('data', data => {
      buffer += decoder.write(data)
    })

    req.on('end', () => {
      buffer += decoder.end()

      cb(buffer)
    })
  }

  obj.combineRouters = function() {
    [...arguments].forEach((router) => {
      allowedMethods.forEach((method) => {
        obj[method] = Object.assign(obj[method], router[method])
      })
    })
  }

  // TODO: currently, this is a 404. Change this to catch all error handler
  obj.generalErrorHandler = unknownPathname

  return obj;
}

exports.requestLogger = (method, pathname) => {
  const dt = new Date().toISOString().replace('T', ' ').substr(0, 19)
  console.log(`[${dt}] [${method}] ${pathname}`)
  // console.log(info.headers)
  // console.log(info.query)
}

const unknownPathname = (req, res) => {
  res.setHeader('Content-Type', 'application/json')
  res.writeHead(404, defaultHeaders)

  const data = {
    statusCode: 404,
    error: '404, url does not exist',
    data: '404, url does not exist'
  }

  res.end(JSON.stringify(data))
}