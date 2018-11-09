
const fs = require('fs')
const http = require('http')
const url = require('url')
// const { StringDecoder } = require('string_decoder')

// const { sanityChecker } = require('../Validators')
const config = require('../config/index')



class NodeServer {


  constructor(protocol, port, options) {
    this.protocol = protocol
    this.port = port
    this.options = {}
    this.server = null
    if(options) {
      this.options.key = fs.readFileSync(options.key)
      this.options.cert = fs.readFileSync(options.cert)
    }

    this.router = {
      'GET': {},
      'POST': {},
      'PUT': {},
      'DELETE': {}
    }

  }



  start() {
    if(!this.server && this.server instanceof http.Server) {
      throw new Error('Server must be bootstrapped and provide a protocol')
    } else {

      const port = (this.port && typeof this.port === 'number') ? this.port : 3000


      this.server.listen(port, () => this._startupMessage(port, this.protocol))
    }
  }



  /**
   * Handle anything that needs to be done before creating the http instance
   */
  bootstrap() {
    if (!this.protocol) {
      throw new Error('Type of server needs to be specified as http or https')
    } else if (this.protocol === 'https') {
      console.log('start https')

    } else {
      this.server = http.createServer((req, res) => {
        this._appendRequestObject(req)

        // execute the correct router
        this.handleRequest(req, res, this.getRequestHandler(req))
      })
    }
    return this
  }




  getRequestHandler(req) {
    if((this.router[req.my.method] && this.router[req.my.method][req.my.pathname])) {
      return this.router[req.my.method][req.my.pathname]

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




  _getSingleURLParameter(req, paramKey) {
    return new url.URL(req.url, 'http://' + req.headers.host + '/').searchParams.get(paramKey)
    // return params.get(paramKey)
  }




  _startupMessage(port, protocol) {
    console.log(`-------- Server Started --------`)
    console.log(`    Mode: ${config.nodeEnv}`)
    console.log(`Protocol: ${protocol}`)
    console.log(`    Port: ${port}`)
    console.log(`\nTo stop listening press ctrl+C\n`)
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

