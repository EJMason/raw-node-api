const http = require('http');

const Server = require('./lib/Server')

const config = {
  nodeEnv: 'development',
  httpOptions: {
    port: 3000,
    path: 'localhost'
  }
};

const httpServer = http.createServer((req, res) => {

  const info = Server.processRequestInfo(req)
  console.log('This is the info: ')
  console.log(info)

  res.end('hello')

}).listen(3000, () => {
  console.log(`
  --------- HTTP Server Started ---------
  node_env: \t${config.nodeEnv}
  type: \thttp
  port: \t${config.httpOptions.port}
  url: \t\thttp://localhost:3000
  `)
});



function processIncomingRequest(req) {

  return {
    path: '',

  }
}