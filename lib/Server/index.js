const url = require('url')

const obj = {}

const allowedMethods = ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']


obj.processRequestInfo = req => {

  // get the path information:
  const path = url.parse(req.url).pathname.replace(/^\/+|\/+$/g, '')
  const paths = url.parse(req.url).pathname.replace(/^\/+|\/+$/g, '').split('/')
  const router = paths.shift().toLowerCase()
  const subRoute = '/' + paths.join('/').toLowerCase()

  const method = req.method.toLowerCase()

  const query = url.parse(req.url).query

  const headers = req.headers


   return {
     path,
     router,
     subRoute,
     method,
     query,
     headers
   }
}

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



module.exports = obj