const url = require('url')
const http = require('http')
const { StringDecoder } = require('string_decoder')

const { sanityChecker } = require('../Validators')


class NodeServer {

  constructor() {
    this.nodeEnv = 'default'
    this.port = null
    this.keys = {
      key: null,
      cert: null
    }
  }

  setNodeEnv(nodeEnv) {
    this.nodeEnv = nodeEnv
    return this
  }

  setPort(port = 3000) {
    const isValid =
      sanityChecker(port)
        .isNumber()
        .validate()

    if(isValid) {
      this.port = port
      console.log('temp')
    } else {
      throw new Error('Port must be supplied as a number value')
    }
    return this
  }

  test() {
    console.log('Looks like it is working')
  }

}

// Private static functions
const startupMessage = function(port, nodeEnv, protocol) {
  console.log(`-------- Server Started --------`)
  console.log(`    Mode: ${nodeEnv}`)
  console.log(`Protocol: ${protocol}`)
  console.log(`    Port: ${port}`)
  console.log(`\nTo stop listening press ctrl+C\n`)
}

module.exports = NodeServer






// exports.getPathName = req => '/' + url.parse(req.url).pathname.replace(/^\/+|\/+$/g, '')
// exports.getMethod = req => req.method.toUpperCase()


// exports.Router = () => {
//   const obj = {}

//   allowedMethods.forEach(val => (obj[val] = {}))
//   obj.defaultHeaders = defaultHeaders

//   // Add a new endpoint
//   obj.addRoute = (method, path, cb) => {
//     // TODO: Fix this to have better handling,
//     if (obj[method]) obj[method][path] = cb
//     else console.error('Error, incorrect method')
//   }

//   // Check for a valid path
//   obj.isValidPath = (method, path) => (obj[method] && obj[method][path])

//   //
//   obj.getRequestHandler = (method, path) => {
//     if (obj.isValidPath(method, path)) {
//       return obj[method][path]
//     } else {
//       return unknownPathname
//     }
//   }


//   obj.requestHandler = (req, res) => {
//     const pathname = exports.getPathName(req)
//     const method = exports.getMethod(req)
//     const handler = obj.getRequestHandler(method, pathname)
//     handler(req, res)
//     // return obj.getRequestHandler(method, pathname)
//   }

//   obj.payloadHandler = (req, cb) => {
//     const decoder = new StringDecoder('utf-8')
//     let buffer = ''

//     req.on('data', data => {
//       buffer += decoder.write(data)
//     })

//     req.on('end', () => {
//       buffer += decoder.end()

//       cb(buffer)
//     })
//   }

//   obj.combineRouters = function() {
//     [...arguments].forEach((router) => {
//       allowedMethods.forEach((method) => {
//         obj[method] = Object.assign(obj[method], router[method])
//       })
//     })
//   }

//   // TODO: currently, this is a 404. Change this to catch all error handler
//   obj.generalErrorHandler = unknownPathname

//   return obj;
// }

// exports.requestLogger = (method, pathname) => {
//   const dt = new Date().toISOString().replace('T', ' ').substr(0, 19)
//   console.log(`[${dt}] [${method}] ${pathname}`)
//   // console.log(info.headers)
//   // console.log(info.query)
// }

// const unknownPathname = (req, res) => {
//   res.setHeader('Content-Type', 'application/json')
//   res.writeHead(404, defaultHeaders)

//   const data = {
//     statusCode: 404,
//     error: '404, url does not exist',
//     data: '404, url does not exist'
//   }

//   res.end(JSON.stringify(data))
// }