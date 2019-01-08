
const fs = require('fs')
const http = require('http')
const url = require('url')
var StringDecoder = require('string_decoder').StringDecoder;

const Router = require('./Router')
const config = require('../config/index')
const helpers = require('../utils')
const errorResponses = require('../Errors/responses')
const middleware = require('./middleware')


class NodeServer {


  constructor(protocol, port, options) {
    this.protocol = protocol
    this.port = port
    this.options = {}
    this.server = null
    if(protocol === 'https' && options) {
      this.options.key = fs.readFileSync(options.key)
      this.options.cert = fs.readFileSync(options.cert)
    }

    this.router = new Router(config.app.allowedMethods)

    this.globalRequestHeaders = {}

  }



  start() {
    if(!this.server && this.server instanceof http.Server) {
      throw new Error('Server must be bootstrapped and provide a protocol')
    } else {

      const port = this._normalizePort(this.port)
      this.server.listen(port, () => this._startupMessage(port, this.protocol))
    }
  }



  /**
   * Handle anything that needs to be done before creating the http instance
   */
  bootstrap(globalHeaders) {
    if (!this.protocol) {
      throw new Error('Type of server needs to be specified as http or https')
    } else if (this.protocol === 'https') {
      console.log('start https')

    } else {
      this.server = http.createServer((req, res) => {

        this._setupDefaultHeaders(globalHeaders, res)

        this._handleRequest(req, res)

        req.on('error', (err) => {
          console.error('Request Error: ', err)

          // TODO: Do some stuff here if there is an error, 500 code
        })
      })
    }
    return this
  }



  /**
   *
   * @param {*} routers
   */
  setupRouters(routers) {
    routers.forEach(router => this.router.add(router))
  }





// ----------------------------- Private Methods ----------------------------- //

  /**
   *
   * @param {*} req
   * @param {*} res
   */
  _handleRequest(req, res) {
      this._appendRequestObject(req)
      this._getDataObject(req)
        .then(() => {
          // middleware
          middleware.developementMiddleware(req, res)

          this._getRequestHandler(req)(req, res)

        })
        .catch(() => {errorResponses.error(req, res, 'Invalid JSON syntax', 422)})

      // const handler = this._getRequestHandler(req)
      // handler(req, res)
      // TODO: execute global middleware

  }



  _getRequestHandler(req) {
    if(this.router.exists(req.my.method, req.my.pathname)) {
      return this.router.getHandler(req.my.pathname, req.my.method)
    } else {
      return this._route404
    }
  }




  _appendRequestObject(req) {
    this._getSingleURLParameter(req, 'foo')

    req.my = {
      pathname: this._getPathName(req),
      method: this._getMethodName(req),
      getSingleURLParameter: this._getSingleURLParameter
    }
  }


    // current method to parse URL requires prefix or else error
    // see: https://stackoverflow.com/questions/48196706/new-url-whatwg-url-api
  _getPathName(req) {
    const parsedUrl = new url.URL(req.url, 'http://' + req.headers.host + '/')
    return ('/' + parsedUrl.pathname.replace(/^\/+|\/+$/g, ''))
  }




  _getMethodName(req) { return req.method.toUpperCase() }



  /**
   * TODO: Haven't looked at this in a while. I better write a description for it....
   * @param {*} req
   * @param {*} paramKey
   */
  _getSingleURLParameter(req, paramKey) {
    return new url.URL(req.url, 'http://' + req.headers.host + '/').searchParams.get(paramKey)
    // return params.get(paramKey)
  }


  /**
   * Needed to use Promise format since cannot return from callbacks
   * of events
   * @param {*} req
   */
   _getDataObject(req) {
    return new Promise((resolve, reject) => {
      let buffer = ''
      const decoder = new StringDecoder('utf-8')

      req.on('data',(chunk) => {
        buffer += decoder.write(chunk)
      })

      req.on('end', () => {
          buffer += decoder.end()
          helpers.safeParseJSON(buffer)
            .then((body) => {
              req.body = body
              resolve(body)
            })
            .catch(error => {
              reject(error)
            })
      })
    })
  }




  _setupDefaultHeaders(globalHeaders, res) {
    Object.entries(globalHeaders).forEach((headerTuple => res.setHeader(headerTuple[0], headerTuple[1])))
  }




  _startupMessage(port, protocol) {
    console.log(`-------- Server Started --------`)
    console.log(`    Mode: ${config.nodeEnv}`)
    console.log(`Protocol: ${protocol}`)
    console.log(`    Port: ${port}`)
    console.log(`\nTo stop listening press ctrl+C\n`)
  }



  _normalizePort(port) {
    if(typeof port === 'number') {
      return port



    } else if(typeof port === 'string') {
      const toInt = parseInt(port)

      if (Number.isNaN(toInt)) {
        throw new Error('Error normalizing port, port in NaN')
      } else {
        return toInt
      }


    } else {
      throw new Error('Please specify a port to start the server in config or as an env variable.')
    }


  }




  _route404(req, res) {

    res.writeHead(404, {
      'Content-Type': 'application/json',
    })

    const data = {
      statusCode: 404,
      error: '404, url does not exist',
      data: '404, url does not exist'
    }

    res.end(JSON.stringify(data))

  }


}

module.exports = NodeServer

